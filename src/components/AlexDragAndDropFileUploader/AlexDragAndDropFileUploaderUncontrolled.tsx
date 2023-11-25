import {FC, useState} from 'react'
import {FileUploader} from 'react-drag-drop-files'
import {Stack, Typography} from '@mui/material'
import {theme} from '../Theme/theme'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

interface IProps {
    value: File | null,
    onChange: Function,
    supportedFileTypes: string[]
}

export const AlexDragAndDropFileUploaderUncontrolled: FC<IProps> = ({
                                                                        value,
                                                                        onChange,
                                                                        supportedFileTypes
                                                                    }) => {
    const handleChange = (file: File) => {
        setIsError(false)
        onChange(file)
        console.log(file)
    }

    const [isError, setIsError] = useState<boolean>(false)
    const handleError = (err: string) => {
        console.log(err)
        setIsError(true)
    }

    const [isDragging, setIsDragging] = useState<boolean>(false)
    const handleDragging = (isDrag: boolean) => {
        setIsDragging(isDrag)
    }

    return (
        <FileUploader
            onDraggingStateChange={handleDragging}
            onTypeError={handleError}
            handleChange={handleChange}
            name="file"
            types={supportedFileTypes}
            multiple={false}
            hoverTitle={' '}
        >
            <Stack direction={'column'} justifyContent={'center'}
                   alignItems={'center'} spacing={theme.spacing(2)}
                   sx={{
                       padding: '60px 0 40px 0',
                       width: '100%',
                       boxSizing: 'border-box',
                       border: '2px dashed #D8E2EE',
                       borderRadius: '5px',
                   }}>
                {!isError && (<>
                    <CloudUploadIcon/>
                    <Typography variant={'h6'}>
                        Переместите файлы сюда
                        <br/>
                        Поддерживаются {supportedFileTypes.join(', ')}
                    </Typography>
                </>)}
                {isError && (
                    <Typography variant={'subtitle1'}>
                        Wrong type of file, try another one
                    </Typography>
                )}
                {value !== undefined && (
                    <Typography variant={'subtitle1'}>
                        file uploaded successfully!
                    </Typography>
                )}
            </Stack>
        </FileUploader>
    )
}