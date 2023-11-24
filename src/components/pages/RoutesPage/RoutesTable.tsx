import {FC, useEffect} from "react";
import {AlexDataTable} from "../../AlexDataTable/AlexDataTable";
import {RoutesTableColumns} from "./columns";
import {usePageState} from "../../functions/usePageState";
import {varsBehaviourMapRoutes} from "./varsBehaviourMapRoutes";
import {EPageType} from "../СustomizationPage/СustomizationPage";
import {useLocation} from "react-router-dom";
import {useLazyRoutesQuery} from "../../../redux/api/routes.api";
import {CONFIG} from "../../../config";

export const RoutesTable: FC = () => {
    const [lazyRoutesQuery, result] = useLazyRoutesQuery()

    const {
        variables,
        serverSideOptions,
        setServerSideOptions
    } = usePageState({
        varsBehaviorMap: varsBehaviourMapRoutes,
        defaultValue: new Map([
            ['perPage', CONFIG.tablePerPage],
            ['page','0']
        ] as [string, any][])
    })

    useEffect(() => {
        variables && lazyRoutesQuery(variables)
    }, [variables])

    const location = useLocation()

    return (
        <AlexDataTable columns={RoutesTableColumns}
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
                       }}/>
    )
}