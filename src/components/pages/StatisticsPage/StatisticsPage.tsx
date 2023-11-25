import React, {FC} from "react";
import {Box, Divider, Grid, Paper, Stack, Typography} from "@mui/material";
import {ChartComponent} from "./ChartComponent";
import {Variant} from "@mui/material/styles/createTypography";
import {Doughnut} from "react-chartjs-2";
import {theme} from "../../Theme/theme";

export interface OptionAnal {
    type: 'chart'
    name: string,
    subtitle: string
    data: {
        label: string,
        value: number
    }[]
}

const options: OptionAnal[] = [
    {
        type: 'chart',
        name: 'Количество нарушений в каждой группе отходов',
        subtitle: 'По сумме перевозок',
        data: [
            {
                label: "Кирпич",
                value: 76
            },
            {
                label: "Грунт",
                value: 20
            },
            {
                label: "Бетон",
                value: 30
            },
            {
                label: "Дерево",
                value: 15
            },
        ]
    },
    {
        type: 'chart',
        name: 'Распознавание нарушений по перевозке отходов',
        subtitle: '',
        data: [
            {
                label: "Выявлено",
                value: 85
            },
            {
                label: "Не выявлено",
                value: 15
            },
        ]
    },

]

export const StatisticsPage: FC = () => {

    return (
        <Stack sx={{
            width: '100%',
            height: '100%',
            overflowY: 'scroll',
        }} direction={'column'} padding={theme.spacing(3)} boxSizing={'border-box'}>
            <Typography variant={'h4'} margin={'0 0 22px 0'}>Общие характеристики</Typography>
            <Grid container spacing={'40px'}>
                {options.map((option) => {
                    if (option.type === 'chart') {

                        return (
                            <Grid item xs={6}>
                                <ChartComponent option={option}/>
                            </Grid>
                        )
                    }
                })}
            </Grid>

            <Typography variant={'h4'} margin={'55px 0 22px 0'}>
                Характеристика нарушений
            </Typography>
            <Paper elevation={0}>
                <Stack direction={'column'} spacing={'40px'}>
                    <Box sx={{width: '100%', height: '5px', background: theme.palette.primary.light}}/>
                    <Stack direction={'column'} padding={"0 75px 100px 30px"} spacing={'40px'}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography variant={'h6'}>Группы отходов:</Typography>
                            {incomeGroups.map((item, index) => {
                                return (
                                    <TypographyPointed colorDot={colorPalette[index]}
                                                       colorTypography={colorPalette[index]} variant={'h6'}
                                                       text={item}/>
                                )
                            })}
                        </Stack>

                        <Stack direction={'column'} spacing={'20px'}>
                            <Typography variant={'h6'}>Соотношение групп</Typography>
                            <Stack direction={'column'} justifyContent={'space-between'}>
                                {rationGroups.map((item) => {
                                    return (
                                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                            <Typography color={'#7A7A7A'}
                                                        variant={'subtitle1'}>{item.label}</Typography>
                                            <Stack direction={'row'} alignItems={'center'} justifyContent={'stretch'}
                                                   width={'65%'}>
                                                {item.data.map((itemData, index) => {

                                                    const sum = item.data.reduce((partialSum, a) => partialSum + a, 0)

                                                    return <Box sx={{
                                                        height: '15px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: `${100 / sum * itemData}%`,
                                                        backgroundColor: colorPalette[index]
                                                    }}><Typography color={'white'}
                                                                   fontSize={'15px'}>{itemData}</Typography></Box>
                                                })}
                                            </Stack>
                                        </Stack>
                                    )
                                })}
                            </Stack>
                        </Stack>

                        <Stack direction={'column'} spacing={'20px'}>
                            <Typography variant={'h6'}>Характеристики группы</Typography>
                            <Stack direction={'column'}>
                                {charactersGroups.map((characterGroups, index) => {
                                    console.log(characterGroups.typeColor !== 'local' && characterGroups.typeSize !== 'large')
                                    return (
                                        <>
                                            <Stack direction={'row'} justifyContent={'space-between'}
                                                   alignItems={'center'} padding={'30px 0 30px 0'}>
                                                {characterGroups.label.legend ? (
                                                    <Stack direction={'column'} spacing={'15px'}>
                                                        <Typography color={'#7A7A7A'}
                                                                    variant={'subtitle1'}>{characterGroups.label.text}</Typography>
                                                        {characterGroups.label.legend.map((legendItem, index) => {
                                                            return (
                                                                <TypographyPointed text={legendItem}
                                                                                   colorDot={colorPalette[index]}/>
                                                            )
                                                        })}
                                                    </Stack>) : <Typography color={'#7A7A7A'} variant={'subtitle1'}
                                                                            maxWidth={'160px'}>{characterGroups.label.text}</Typography>}


                                                <Stack
                                                    direction={"row"}
                                                    justifyContent={'space-between'}
                                                    alignItems={'center'}
                                                    width={'70%'}
                                                    boxSizing={'border-box'}
                                                    paddingLeft={characterGroups.typeSize !== 'large' ? '26px' : '0px'}
                                                    paddingRight={characterGroups.typeSize !== 'large' ? '26px' : '0px'}
                                                >
                                                    {characterGroups.typeColor === 'general'
                                                        && characterGroups.typeSize === 'small'
                                                        && characterGroups.data.map((dataItem, index) => {
                                                            return <ChartEzEz option={dataItem as number}
                                                                              index={index}/>
                                                        })}
                                                    {characterGroups.typeColor === 'local'
                                                        && characterGroups.typeSize === 'large'
                                                        && characterGroups.data.map((dataItem) => {
                                                            return <ChartHardHard options={dataItem as number[]}/>
                                                        })}
                                                    {characterGroups.typeColor === 'local'
                                                        && characterGroups.typeSize === 'small'
                                                        && characterGroups.data.map((dataItem) => {
                                                            return <ChartEzHard option={dataItem as number}/>
                                                        })}
                                                </Stack>

                                            </Stack>
                                            {index !== charactersGroups.length - 1 && <Divider/>}
                                        </>
                                    )
                                })}
                            </Stack>
                        </Stack>

                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    )
}

const ChartEzEz = ({option, index}: { option: number, index: number }) => {
    return (
        <Box width={'75px'} height={'75px'}>
            <Doughnut
                options={{
                    responsive: true,
                    maintainAspectRatio: false
                }}
                data={{
                    labels: [],
                    datasets: [
                        {
                            data: [option, 100 - option],
                            backgroundColor: [colorPalette[index], '#A1A1A1']
                        }
                    ]
                }}
            />
        </Box>
    )
}

const ChartEzHard = ({option}: { option: number }) => {
    return (
        <Box width={'75px'} height={'75px'}>
            <Doughnut
                options={{
                    responsive: true,
                    maintainAspectRatio: false
                }}
                data={{
                    labels: [],
                    datasets: [
                        {
                            data: [option, 100 - option],
                            backgroundColor: [colorPalette[0], colorPalette[1]]
                        }
                    ]
                }}
            />
        </Box>
    )
}

const ChartHardHard = ({options}: { options: number[] }) => {
    return (
        <Box width={'130px'} height={'130px'}>
            <Doughnut
                options={{
                    responsive: true,
                    maintainAspectRatio: false
                }}
                data={{
                    labels: [],
                    datasets: [
                        {
                            data: options,
                            // @ts-ignore
                            backgroundColor: options.map((value, index) => colorPalette[index])
                        }
                    ]
                }}
            />
        </Box>
    )
}

interface TypographyPointedProps {
    colorTypography?: string
    colorDot?: string
    variant?: Variant
    text?: string

}

const TypographyPointed: React.FC<TypographyPointedProps> = ({
                                                                 colorTypography,
                                                                 colorDot,
                                                                 variant,
                                                                 text
                                                             }) => {
    return (
        <Stack direction={'row'} spacing={'10px'} alignItems={'center'}>
            <Box sx={{
                width: '10px',
                height: '10px',
                background: colorDot
            }}/>
            <Typography variant={variant} color={colorTypography}>{text}</Typography>
        </Stack>
    )
}

const incomeGroups: string[] = ['Бетон', 'Грунт', 'Дерево', 'Кирпич']
const rationGroups = [
    {
        label: 'Соотношение выявленного отхода по камерам в процентах',
        data: [20, 40, 30, 10]
    },
    {
        label: 'Количественный показатель, шт.',
        data: [60, 120, 90, 30]
    }
]

interface ICharactersGroup {
    label: {
        text: string,
        legend?: string[]
    },
    data: number[] | number[][]
    typeSize: 'small' | 'large'
    typeColor: 'local' | 'general'
}

const charactersGroups: ICharactersGroup[] = [
    {
        label: {
            text: 'Доля проверенных машин, %',
        },
        data: [78, 63, 78, 78],
        typeSize: 'small',
        typeColor: 'general'
    },
    {
        label: {
            text: 'Доля совпадения работы системы, %',
        },
        data: [70, 64, 58, 48],
        typeSize: 'small',
        typeColor: 'general'
    },
    {
        label: {
            text: 'Доля заполненных свалок, %',
        },
        data: [58, 57, 62, 61],
        typeSize: 'small',
        typeColor: 'general'
    },
    {
        label: {
            text: 'Доля сезонности нарушений, %',
            legend: ['Зима', 'Весна','Лето','Осень']
        },
        data: [40, 38, 35, 37],
        typeSize: 'small',
        typeColor: 'local'
    },
    {
        label: {
            text: 'Доля округов и районов с макс. количеством нарушений в г. Москва, %',
            legend: ['Южный округ','Северный округ','Западный округ']
        },
        data: [[33, 37, 30], [19, 40, 41], [30, 25, 15], [15, 33, 52]],
        typeSize: 'large',
        typeColor: 'local'
    },
    {
        label: {
            text: 'Доля округов и районов с мин. количеством нарушений в г. Москва, %',
            legend: ['Юго-Восточный округ','Восточный округ','Центральный округ']
        },
        data: [[33, 37, 30], [19, 40, 41], [30, 25, 15], [15, 33, 52]],
        typeSize: 'large',
        typeColor: 'local'
    },
]

const colorPalette = [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.primary.dark, theme.palette.secondary.light]

