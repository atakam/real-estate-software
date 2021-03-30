import draftToHtml from 'draftjs-to-html';
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

const getHtmlFromJSDraft = (obj) => {
    const editorState = EditorState.fromJS(obj);
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    return draftToHtml(rawContentState);
}

const getDraftFromHtml = (html) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    return EditorState.createWithContent(contentState);
}

export {
    getHtmlFromJSDraft,
    getDraftFromHtml
}