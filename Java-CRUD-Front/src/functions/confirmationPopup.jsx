import * as AlertDialog from '@radix-ui/react-alert-dialog';

export const confirmationPopup = (message) => {

return (
    <AlertDialog.Root>
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
            <AlertDialog.Content>
                <AlertDialog.Title className="text-lg font-semibold">
                    Você tem certeza?
                </AlertDialog.Title>
                <AlertDialog.Description className="text-sm text-gray-500">
                    {message}
                </AlertDialog.Description>
                <div>
                    <AlertDialog.Cancel className="text-sm text-gray-500 hover:text-gray-700">
                        Cancelar
                    </AlertDialog.Cancel>
                    <AlertDialog.Action className="text-sm text-gray-500 hover:text-gray-700">
                        Confirmar
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
)

}