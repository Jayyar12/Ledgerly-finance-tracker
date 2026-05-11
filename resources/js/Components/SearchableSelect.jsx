import { useState, useMemo } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';

export default function SearchableSelect({ 
    options = [], 
    value, 
    onChange, 
    placeholder = "Select an option...",
    labelField = "name",
    valueField = "id",
    error = null
}) {
    const [query, setQuery] = useState('');

    const filteredOptions = useMemo(() => {
        const safeOptions = Array.isArray(options) ? options : [];
        if (query === '') return safeOptions;
        
        return safeOptions.filter((option) => {
            const label = option[labelField] ? String(option[labelField]) : '';
            return label.toLowerCase().includes(query.toLowerCase());
        });
    }, [query, options, labelField]);

    const selectedOption = useMemo(() => {
        const safeOptions = Array.isArray(options) ? options : [];
        return safeOptions.find(opt => opt[valueField] === value);
    }, [value, options, valueField]);

    return (
        <div className="relative">
            <Combobox value={value} onChange={onChange}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white dark:bg-slate-900 text-left border border-slate-300 dark:border-slate-700 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all duration-200">
                        <Combobox.Input
                            className="w-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 text-slate-900 dark:text-slate-200 bg-transparent focus:ring-0"
                            displayValue={() => selectedOption ? selectedOption[labelField] : ''}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={placeholder}
                            autoComplete="off"
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronsUpDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
                        </Combobox.Button>
                    </div>

                    <Transition
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-slate-800 py-1 text-base shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[100] border border-slate-100 dark:border-slate-700"
                    >
                        <Combobox.Options>
                            {filteredOptions.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-4 px-4 text-slate-500 text-center italic">
                                    Nothing found for "{query}"
                                </div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <Combobox.Option
                                        key={option[valueField]}
                                        className={({ active }) =>
                                            `relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors ${
                                                active ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
                                            }`
                                        }
                                        value={option[valueField]}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center gap-3">
                                                    {option.color && (
                                                        <div 
                                                            className="w-3 h-3 rounded-full flex-shrink-0"
                                                            style={{ backgroundColor: option.color }}
                                                        />
                                                    )}
                                                    <span className={`block truncate ${selected ? 'font-bold' : 'font-normal'}`}>
                                                        {option[labelField]}
                                                        {option.type && (
                                                            <span className="ml-2 text-[10px] uppercase tracking-tighter opacity-50">
                                                                ({option.type})
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-600">
                                                        <Check className="h-4 w-4" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
            {error && <p className="mt-2 text-sm text-rose-500">{error}</p>}
        </div>
    );
}
