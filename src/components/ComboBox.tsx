'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@lib/utils'
import { Button } from '@components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@components/ui/command'

// import { Content, Role } from "@app/dto/webtoon";

export function Combobox({
    list,
    role,
    defaultValue,
    onChange,
}: {
    list: { label: string; value: string }[]
    role: { label: string; value: string }
    defaultValue: string | null
    onChange: (role: string, value: string) => void
}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')

    React.useEffect(() => {
        defaultValue ? setValue(defaultValue) : null
    }, [defaultValue])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-sm"
                >
                    {value
                        ? list.find((item: { value: string; label: string }) => item.value === value)?.label
                        : role.label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {list.map((item: { value: string; label: string }) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? '' : currentValue)
                                        onChange(role.value, currentValue === value ? '' : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === item.value ? 'opacity-100' : 'opacity-0',
                                        )}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
