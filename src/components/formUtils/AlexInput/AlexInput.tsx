import React, {useCallback, useState} from "react";
import {FormControl, IconButton, InputAdornment, TextField, TextFieldProps, TextFieldVariants} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface IProps extends TextFieldProps {
    name: string
    defaultValue?: string
    label?: string
    required?: boolean
    validateFunctions?: {
        [key: string]: (valueToCheck: string) => boolean | string
    }
    error?: boolean,
    errorText?: string
    hidden?: boolean
    multiline?: boolean
    maxRows?: number
    variant?: TextFieldVariants
}

const DEBUG = false
const DEBUG_PREFIX = 'ALEX_INPUT'

const AlexInput: React.FC<IProps> = ({
                                         name,
                                         defaultValue,
                                         label,
                                         required = false,
                                         validateFunctions = undefined,
                                         error = false,
                                         errorText = undefined,
                                         hidden = false,
                                         multiline = false,
                                         maxRows,
                                         variant = 'outlined',
                                         ...props
                                     }) => {

    const {control} = useFormContext()

    const [showPassword, setShowPassword] = useState<boolean>(!hidden)

    const inputPropsConstructor = useCallback(() => {
        if (!hidden) return undefined

        return {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
            ),
        }

    }, [hidden])

    return (
        <Controller
            name={name}
            defaultValue={defaultValue || ''}
            control={control}
            rules={{
                validate: {
                    required: required ? (value: string) => value?.length > 0 || 'обязательное поле' : () => true,
                    ...validateFunctions,
                }
            }}
            render={({field: {onChange, value}}) => {
                DEBUG && console.log(DEBUG_PREFIX, 'value', value)
                return (
                    <FormControl fullWidth>
                        <TextField
                            variant={variant}
                            defaultValue={value}
                            type={showPassword ? "text" : "password"}
                            label={error && errorText ? `${label}, ${errorText}` : label}
                            value={value}
                            onChange={onChange}
                            error={error}
                            multiline={multiline}
                            maxRows={maxRows}
                            InputProps={inputPropsConstructor()}
                            {...props}
                        />
                    </FormControl>
                )
            }
            }
        />
    )
}

export {AlexInput}