import * as AlertDialog from '@radix-ui/react-alert-dialog';

export const ConfirmationPopup = ({open, setOpen, handleAction, message}) => {

return (
    <AlertDialog.Root open={open} onOpenChange={setOpen} >
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-[overlay-show_200ms] data-[state=closed]:animate-[overlay-hide_200ms]" />
            <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white text-white shadow w-full max-w-md overflow-hidden data-[state=open]:animate-[dialog-show_200ms] data-[state=closed]:animate-[dialog-hide_200ms]">
                <div className='flex items-center justify-center p-4 bg-purple-contrast'>
                    <AlertDialog.Title className="text-lg font-semibold">
                        Você tem certeza?
                    </AlertDialog.Title>
                </div>
                <AlertDialog.Description className="text-lg text-gray-500 py-3 px-6">
                    {message}
                </AlertDialog.Description>
                <div className='flex justify-end space-x-4 p-4 pr-8'>
                    <AlertDialog.Cancel className="text-sm text-gray-500 border-2 border-gray-200 hover:text-gray-700 hover:border-gray-600  px-4 py-2 rounded-lg">
                        Cancelar
                    </AlertDialog.Cancel>
                    <AlertDialog.Action onClick={() => handleAction()} className="text-sm text-white rounded-lg border-2 border-purple-highlight px-4 py-2 hover:text-amber bg-purple-highlight hover:scale-105">
                        Confirmar
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
)

}
