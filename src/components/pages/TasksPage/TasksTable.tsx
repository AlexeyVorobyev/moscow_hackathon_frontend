import {FC, useEffect} from 'react'
import {AlexDataTable} from '../../AlexDataTable/AlexDataTable'
import {usePageState} from '../../functions/usePageState'
import {varsBehaviourMapTasks} from './varsBehaviourMapTasks'
import {EPageType} from '../СustomizationPage/СustomizationPage'
import {useLocation} from 'react-router-dom'
import {CONFIG} from '../../../config'
import {TasksTableColumns} from './columns'
import {useLazyTasksQuery} from '../../../redux/api/tasks.api'
import {ICoordinates} from '../../../redux/api/types/resources'

export const TasksTable: FC = () => {
    const [lazyUsersQuery, result] = useLazyTasksQuery()

    const {
        variables,
        serverSideOptions,
        setServerSideOptions
    } = usePageState({
        varsBehaviorMap: varsBehaviourMapTasks,
        defaultValue: new Map([
            ['perPage', CONFIG.tablePerPage],
            ['page', '0']
        ] as [string, any][])
    })

    useEffect(() => {
        variables && lazyUsersQuery(variables)
    }, [variables])

    const location = useLocation()

    return (
        <AlexDataTable columns={TasksTableColumns}
                       data={result?.currentData?.response.response}
                       availablePages={result?.currentData?.response.pages}
                       perPageOptions={CONFIG.tablePerPageOptions}
                       availableElements={result?.currentData?.response.totalElements}
                       columnsSelect footer downloadCSV
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
                           // custom: {
                           //     viewMap: {
                           //         columnName: 'id',
                           //         title: 'Перезапустить',
                           //         function: (args) => {
                           //             const {id} = args
                           //         }
                           //     }
                           // }
                       }}/>
    )
}