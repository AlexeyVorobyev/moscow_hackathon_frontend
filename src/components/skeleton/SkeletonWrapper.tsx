import React, {FC, ReactNode, useState} from 'react'
import {Box, Button, IconButton, Paper, Popover, Stack, Typography} from '@mui/material'
import {SideNavigation} from './SideBar/SideNavigation'
import {theme} from '../Theme/theme'
import {PageWrapper} from './PageWrapper'
import {ErrorBoundary} from './ErrorBoundary/ErrorBoundary'
import {PROJECT_NAME} from '../../globalVars'
import headerLogoIcon from './../../assets/logo/headerLogo.svg'
import CloseIcon from '@mui/icons-material/Close'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {LinkRouterWrapper} from '../LinkRouterWrapper/LinkRouterWrapper'

interface IProps {
    children: ReactNode
}

export const SkeletonWrapper: FC<IProps> = ({children}) => {

    const [openButtonPopover, setOpenButtonPopover] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
        setOpenButtonPopover(!openButtonPopover)
    }

    return (
        <Box width={'100%'} height={'100%'}>
            <Box height={'70px'} sx={{
                background: theme.palette.primary.main,
                boxSizing: 'border-box',
                padding: theme.spacing(2),
                boxShadow: 2,
                zIndex: 1000,
                position: 'relative'
            }}>
                <Stack alignItems={'center'} direction={'row'} height={'100%'} justifyContent={'space-between'}>
                    <img src={headerLogoIcon} alt={PROJECT_NAME}/>
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <LinkRouterWrapper to={'/cabinet'}>
                            <IconButton>
                                <AccountCircleIcon style={{color:theme.palette.primary.contrastText}}/>
                            </IconButton>
                        </LinkRouterWrapper>
                        <LinkRouterWrapper to={'/cabinet'}>
                            <Typography variant={'subtitle1'} sx={{cursor: 'pointer'}} color={theme.palette.primary.contrastText}>Личный кабинет</Typography>
                        </LinkRouterWrapper>
                        <IconButton onClick={handleClick}>
                            <CloseIcon style={{color:theme.palette.primary.contrastText}}/>
                        </IconButton>
                        <Popover
                            open={openButtonPopover}
                            anchorEl={anchorEl}
                            sx={{
                                zIndex: 100000
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <Paper elevation={3} sx={{padding: '10px'}}>
                                <Stack direction={'column'} spacing={1}>
                                    <Typography>Выйти из аккаунта?</Typography>
                                    <Stack direction={'row'} spacing={'10px'}>
                                        <Button size={'large'}
                                                onClick={() => {
                                                    localStorage.clear()
                                                    location.reload()
                                                }}
                                                variant="contained">
                                            Да
                                        </Button>
                                        <Button size={'large'}
                                                onClick={() => setOpenButtonPopover(false)}
                                                variant="contained">
                                            Нет
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Popover>
                    </Stack>
                </Stack>
            </Box>
            <Stack height={'calc(100vh - 70px)'} width={'100%'} direction={'row'}>
                <SideNavigation/>
                <Box sx={{flex: '1', height: '100%', width: '0'}}>
                    <ErrorBoundary>
                        {children}
                    </ErrorBoundary>
                </Box>
            </Stack>
        </Box>
    )
}

