import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import { Button, useThemeMode } from 'flowbite-react';
import {BsDownload} from 'react-icons/bs';

export default function MarkdownViewer(props) {

    const {type, value} = props;
    const [mode,,] = useThemeMode(); 

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
                <div className='absolute top-0 right-0 mt-4 mr-4 z-10'>
                    <Button color='gray' onClick={() => downloadClick()} className='flex'>
                        {type}.md
                        <BsDownload className='ml-2' />
                    </Button>
                </div>
                <div className='scale-125 h-4/5 w-4/5' data-color-mode={mode}>
                    <MDEditor
                        value={value}
                        highlightEnable={false}
                        autoFocus={false}
                        preview={'preview'}        // edit, live, preview
                        hideToolbar={true}
                        visibleDragbar={false}
                        height={"100%"}
                        previewOptions={{rehypePlugins: [[rehypeSanitize]]}}
                    />
                </div>
            </div>
        </>
    )
}