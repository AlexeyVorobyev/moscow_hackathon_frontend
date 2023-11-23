import {FC, useEffect} from "react";
import {AlexDataTable} from "../../AlexDataTable/AlexDataTable";
import {ViolationsTableColumns} from "./columns";
import {usePageState} from "../../functions/usePageState";
import {varsBehaviourMapViolations} from "./varsBehaviourMapViolations";
import {EPageType} from "../СustomizationPage/СustomizationPage";
import {useLocation} from "react-router-dom";
import {useLazyViolationsQuery} from "../../../redux/api/violations.api";
import {CONFIG} from "../../../config";

export const ViolationsTable: FC = () => {
    const [lazyViolationsQuery, result] = useLazyViolationsQuery()

    const {
        variables,
        serverSideOptions,
        setServerSideOptions
    } = usePageState({
        varsBehaviorMap: varsBehaviourMapViolations,
        defaultValue: new Map([
            ['perPage', CONFIG.tablePerPage]
        ] as [string, any][])
    })

    useEffect(() => {
        variables && lazyViolationsQuery(variables)
    }, [variables])

    const location = useLocation()

    return (
        <AlexDataTable columns={ViolationsTableColumns}
                       data={result?.currentData?.content}
                       availablePages={result?.currentData?.totalPages}
                       perPageOptions={CONFIG.tablePerPageOptions}
                       availableElements={result?.currentData?.totalElements}
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