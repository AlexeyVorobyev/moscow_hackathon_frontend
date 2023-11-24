import {FC, useEffect} from "react";
import {AlexDataTable} from "../../AlexDataTable/AlexDataTable";
import {usePageState} from "../../functions/usePageState";
import {varsBehaviourMapGarbages} from "./varsBehaviourMapGarbages";
import {EPageType} from "../СustomizationPage/СustomizationPage";
import {useLocation} from "react-router-dom";
import {CONFIG} from "../../../config";
import {GarbagesTableColumns} from "./columns";
import {useGarbageDeleteMutation, useLazyGarbagesQuery} from "../../../redux/api/garbages.api";

export const GarbagesTable: FC = () => {
    const [lazyGarbagesQuery, result] = useLazyGarbagesQuery()
    const [deleteGarbage] = useGarbageDeleteMutation()

    const {
        variables,
        serverSideOptions,
        setServerSideOptions
    } = usePageState({
        varsBehaviorMap: varsBehaviourMapGarbages,
        defaultValue: new Map([
            ['perPage', CONFIG.tablePerPage],
            ['page','0']
        ] as [string, any][])
    })

    useEffect(() => {
        variables && lazyGarbagesQuery(variables)
    }, [variables])

    const location = useLocation()

    return (
        <AlexDataTable columns={GarbagesTableColumns}
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
                           edit: {
                               columnName: 'id',
                               path: `./../${EPageType.edit}`,
                               params: new URLSearchParams([
                                   ['from', JSON.stringify(location.pathname + location.search)]
                               ])
                           },
                           delete: {
                               columnName: 'id',
                               mutation: deleteGarbage,
                               showModal: true
                           }
                       }}/>
    )
}