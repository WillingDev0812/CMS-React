// wangeditor
import React, { useEffect, useState } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { IDomEditor, IEditorConfig, IToolbarConfig, i18nChangeLanguage } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { Button, Card } from 'antd'
import styled from 'styled-components'
import { CreateArticle } from './create'
import { debounce } from '@/utils/function'
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons'

export const CreateArticleEditor = () => {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isShowVisible, setIsShowVisible] = useState(true)

  const defaultHtml = <DefaultHtmlStyle></DefaultHtmlStyle>
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ['fullScreen'],
  }
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: 'Please enter...',
    MENU_CONF: {
      fontSize: {
        fontSizeList: ['16px', '18px', '22px'],
      },
    },
    onCreated: (editor) => {
      i18nChangeLanguage('en')
      setEditor(editor)
    },
    onChange: (editor) => {
      const contentText = editor.getText()
      setDescription(contentText)
    },
  }

  const titleChangeHandler = (e: any) => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    return () => {
      if (editor === null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <EditorWrapper>
      <div style={{ flex: '1 1 auto', position: 'relative' }}>
        {/* TODO: change toolbar background-color */}
        <Toolbar editor={editor} defaultConfig={toolbarConfig} mode="default" style={{ margin: '0 1px' }}></Toolbar>
        <Card bordered={false}>
          <TitleWrapper>
            <input placeholder="Please enter title" onChange={debounce(titleChangeHandler)}></input>
          </TitleWrapper>
          <Editor
            defaultConfig={editorConfig}
            defaultHtml={`${defaultHtml}`}
            mode="default"
            style={{ height: '637px', overflowY: 'hidden' }}
          ></Editor>
        </Card>
        <ExpandAndFoldWrapper onClick={() => setIsShowVisible(!isShowVisible)}>
          {isShowVisible && (
            <span className="expandBtn">
              <DoubleRightOutlined style={{ color: '#4047f4' }} />
            </span>
          )}
          {!isShowVisible && (
            <span className="expandBtn">
              <DoubleLeftOutlined style={{ color: '#4047f4' }} />
            </span>
          )}
        </ExpandAndFoldWrapper>
      </div>
      {isShowVisible && (
        <div style={{ width: 480, height: 'auto' }}>
          <CreateArticle title={title} description={description}></CreateArticle>
        </div>
      )}
    </EditorWrapper>
  )
}

const EditorWrapper = styled.div`
  display: flex;
`

const TitleWrapper = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #ececec;
  input {
    font-size: 30px;
    border: 0;
    outline: none;
    width: 100%;
    line-height: 1;
    padding-left: 10px;
  }
  input::-webkit-input-placeholder {
    color: #7c848d;
  }
`

const DefaultHtmlStyle = styled.p`
  font-size: 14px;
`

const ExpandAndFoldWrapper = styled.div`
  .expandBtn {
    text-align: center;
    width: 35px;
    height: 35px;
    line-height: 35px;
    border-radius: 100%;
    position: absolute;
    top: 40px;
    right: -18px;
    background-color: #fff;
    box-shadow: 0 1px 10px 0 rgb(64 71 244 / 30%);
    z-index: 3;
  }
`
