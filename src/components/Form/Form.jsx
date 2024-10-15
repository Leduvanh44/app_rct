import Card from "@/components/Card"
import FormMenu from "@/components/PoperMenu/FormMenu"
import TableMenu from "@/components/PoperMenu/TableMenu"
import { getUpdatedMenuValue as getNewValue } from "@/utils/functions"

function Form({ menuNavigaton, basePath = [], setInvalid, value = {}, setValue, className, onDeleteRow }) {
    const handleSetValue = (itemValue, id) => {
        setValue((prevValue) => getNewValue(prevValue, itemValue, [menuNavigaton.id], id))
    }

    return (
        <div data-component="Form" className="h-full w-full">
            <Card className="h-full w-full">
                <div className="flex items-center">
                    <h2 className="ml-3">{menuNavigaton.title}</h2>
                </div>

                {menuNavigaton.type === "form" ? (
                    <FormMenu
                        items={menuNavigaton.items}
                        path={[...basePath, menuNavigaton.id]}
                        value={value}
                        setValue={handleSetValue}
                    />
                ) : (
                    <TableMenu
                        headers={menuNavigaton.headers}
                        path={[...basePath, menuNavigaton.id]}
                        subNav={menuNavigaton.subNav}
                        value={value}
                        setValue={handleSetValue}
                        onDeleteRow={onDeleteRow}
                    />
                )}
            </Card>
        </div>
    )
}

export default Form
