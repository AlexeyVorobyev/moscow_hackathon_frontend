import {FC} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {AlexDragAndDropFileUploaderUncontrolled} from './AlexDragAndDropFileUploaderUncontrolled'

interface IProps {
    name: string
    required?: boolean
    supportedFileTypes: string[]
}

const DEBUG = true
export const AlexDragAndDropFileUploader: FC<IProps> = ({
                                                            name,
                                                            required = false,
                                                            supportedFileTypes
                                                        }) => {

    const {control} = useFormContext()


    return (
        <Controller
            name={name}
            control={control}
            rules={{
                validate: {
                    required: required ? (value: string) => value || 'обязательное поле' : () => true,
                }
            }}
            render={({field: {onChange, value}}) => {
                DEBUG && console.debug(value, 'FILE')
                return (
                    <AlexDragAndDropFileUploaderUncontrolled value={value} onChange={onChange}
                                                             supportedFileTypes={supportedFileTypes}/>
                )
            }}
        />
    )
}