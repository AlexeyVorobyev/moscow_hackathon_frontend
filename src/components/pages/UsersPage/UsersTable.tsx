import {FC, useEffect} from "react";
import {AlexDataTable} from "../../AlexDataTable/AlexDataTable";
import {usePageState} from "../../functions/usePageState";
import {varsBehaviourMapUsers} from "./varsBehaviourMapUsers";
import {EPageType} from "../СustomizationPage/СustomizationPage";
import {useLocation} from "react-router-dom";
import {CONFIG} from "../../../config";
import {useLazyUsersQuery} from "../../../redux/api/users.api";
import {UsersTableColumns} from "./columns";

export const UsersTable: FC = () => {
    const [lazyUsersQuery, result] = useLazyUsersQuery()

    const {
        variables,
        serverSideOptions,
        setServerSideOptions
    } = usePageState({
        varsBehaviorMap: varsBehaviourMapUsers,
        defaultValue: new Map([
            ['perPage', CONFIG.tablePerPage]
        ] as [string, any][])
    })

    useEffect(() => {
        variables && lazyUsersQuery(variables)
    }, [variables])

    const location = useLocation()

    return (
        <AlexDataTable columns={UsersTableColumns}
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