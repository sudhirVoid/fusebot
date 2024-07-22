interface FileData{
    name: string,
    type: string,
    url: string,
    updatedAt: string
    onDownloadHandler: (fileData: FileData) => void,
    onDeleteHandler: (fileData: FileData) => void
}


export type {FileData}