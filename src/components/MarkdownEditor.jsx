import { useState } from 'react';
import MDEditor, {codeEdit, codeLive, codePreview, divider} from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import { Modal, Button, useThemeMode } from 'flowbite-react';
import {ImWarning} from 'react-icons/im'; 
import {BsDownload} from 'react-icons/bs';
import {mdMaxSize} from '../utils/settings.json';

export default function MarkdownEditor(props) {

    const {type, value, setValue} = props;
    const [mode,,] = useThemeMode();
    const [showModal, setShowModal] = useState(false);

    const uploadFileClick = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".md,.txt"; // Only allow .md and .txt files
        input.addEventListener("change", () => {
            const file = input.files[0];
            if (!/\.md$|\.txt$/.test(file.name) || file.size > mdMaxSize.value) {
                alert(`Please upload a .md or .txt file with a maximum size of ${mdMaxSize.text}.`)
                return;
            }
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                setValue(reader.result);
            };
        });
        input.click();
    };

    const downloadClick = () => {
        if (value.length === 0) return;
        const element = document.createElement("a");
        const file = new Blob([value], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `${type}.md`
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    return (
        <>
             <div className='center flex h-full w-full relative'>
                <div className='absolute top-0 right-0 mt-14 mr-4 z-10'>
                    <Button color='gray' onClick={() => downloadClick()} className='flex'>
                        {type}.md
                        <BsDownload className='ml-2' />
                    </Button>
                </div>
                <div className='scale-125 h-4/5 w-4/5' data-color-mode={mode}>
                    <MDEditor
                        value={value}
                        onChange={setValue}
                        highlightEnable={true}
                        autoFocus={true}
                        preview={'live'}        // edit, live, preview
                        hideToolbar={false}
                        visibleDragbar={false}
                        height={"100%"}
                        previewOptions={{rehypePlugins: [[rehypeSanitize]]}}
                        extraCommands={[
                            codeEdit, codeLive, codePreview,
                            divider,
                            {
                                name: "upload",
                                keyCommand: "upload",
                                buttonProps: { "aria-label": "Add file" , title: "Upload file"},
                                icon: (
                                    <svg viewBox="0 0 1024 1024" width="12" height="12">
                                        <path fill="currentColor" d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z" />
                                    </svg>
                                ),
                                execute: uploadFileClick,                             
                            },
                            {
                                name: "deleteContent",
                                keyCommand: "deleteContent",
                                buttonProps: { "aria-label": "Delete content" , title: "Delete content"},
                                icon: (
                                    <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg> 
                                ),
                                execute: () => setShowModal(true),
                            },
                        ]}
                    />
                </div>
            </div>

            <Modal
                show={showModal}
                size="md"
                popup={true}
                onClose={ () => setShowModal(false)}
                className={value.length===0 ? 'hidden' : ''}
            >
                <Modal.Header />
                <Modal.Body>
                <div className="text-center">
                    <ImWarning className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete the content?
                    </h3>
                    <div className="flex justify-center gap-4">
                    <Button
                        color="failure"
                        onClick={ () => {setShowModal(false); setValue('')}}
                    >
                        Yes, I'm sure
                    </Button>
                    <Button
                        color="gray"
                        onClick={ () => setShowModal(false)}
                    >
                        No, cancel
                    </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>

        </>
    )
}