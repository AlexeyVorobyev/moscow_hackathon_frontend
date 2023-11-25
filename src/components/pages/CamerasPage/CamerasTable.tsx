import {FC, useEffect} from 'react'
import {AlexDataTable} from '../../AlexDataTable/AlexDataTable'
import {CamerasTableColumns} from './columns'
import {usePageState} from '../../functions/usePageState'
import {varsBehaviourMapCameras} from './varsBehaviourMapCameras'
import {EPageType} from '../СustomizationPage/СustomizationPage'
import {useLocation, useNavigate} from 'react-router-dom'
import {useLazyCamerasQuery} from '../../../redux/api/cameras.api'
import {CONFIG} from '../../../config'
import {ICoordinates} from '../../../redux/api/types/resources'

export const CamerasTable: FC = () => {
    const [lazyCamerasQuery, result] = useLazyCamerasQuery()

    const {
        variables,
        serverSideOptions,
        setServerSideOptions
    } = usePageState({
        varsBehaviorMap: varsBehaviourMapCameras,
        defaultValue: new Map([
            ['perPage', CONFIG.tablePerPage],
            ['page', '0']
        ] as [string, any][])
    })

    useEffect(() => {
        variables && lazyCamerasQuery(variables)
    }, [variables])

    const navigate = useNavigate()

    const location = useLocation()

    return (
        <AlexDataTable columns={CamerasTableColumns}
                       data={result?.currentData?.response.response}
                       availablePages={result?.currentData?.response.pages}
                       perPageOptions={CONFIG.tablePerPageOptions}
                       availableElements={result?.currentData?.response.totalElements}
                       columnsSelect simpleFilter footer downloadCSV
                       filterListIds={[]}
                       serverSideOptions={serverSideOptions}
                       setServerSideOptions={setServerSideOptions}
                       actionsConfig={{
                           view: {
                               columnName: 'id',
                               path: `./../${EPageType.view}`,
                               params: new URLSearchParams([
                                   ['from', JSON.stringify(location.pathname + location.search)]
                               ])
                           },
                           custom: {
                               viewMap: {
                                   columnName: 'id',
                                   title: 'Посмотреть на карте',
                                   function: (args) => {
                                       const {id, rowData, rawData} = args
                                       const coords = rawData.find((_row) => _row.id === id).coordinates as ICoordinates
                                       const searchParams = new URLSearchParams([
                                           ['coords', JSON.stringify([coords.lat, coords.lon])],
                                           ['toOpen', id],
                                           ['zoom', '10'],
                                           ['cameras', true]
                                       ] as [string, any][])
                                       navigate(`/mainMap?${searchParams.toString()}`)
                                   }
                               }
                           }
                       }}/>
    )
}