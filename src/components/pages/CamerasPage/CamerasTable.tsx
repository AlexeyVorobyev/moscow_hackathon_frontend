import {FC, useEffect} from "react";
import {AlexDataTable} from "../../AlexDataTable/AlexDataTable";
import {CamerasTableColumns} from "./columns";
import {usePageState} from "../../functions/usePageState";
import {varsBehaviourMapCameras} from "./varsBehaviourMapCameras";
import {EPageType} from "../СustomizationPage/СustomizationPage";
import {useLocation} from "react-router-dom";
import {useLazyCamerasQuery} from "../../../redux/api/cameras.api";
import {CONFIG} from "../../../config";

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
            ['page','0']
        ] as [string, any][])
    })

    useEffect(() => {
        variables && lazyCamerasQuery(variables)
    }, [variables])

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
                       }}/>
    )
}