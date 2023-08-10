import {MdSettings} from 'react-icons/md'
import {MdLink} from 'react-icons/md'

//////////////////
// Main Structure:
//////////////////
export const myStructure = (S) =>
  S.list()
    .title('Site')
    .items([
      settingsSection(S),
      S.listItem()
        .title('Portfolios')
        .child(
          S.list()
            .title('List of Portfolios')
            .items([
              programmingSection(S),
              // ... other portfolio items
            ])
        ),
      S.listItem()
        .title('About Me Page')
        .child(S.editor().title('About Me Page').schemaType('aboutMePage').documentId('aboutMePage'))
      ,
    ])

///////////
// Settings
///////////
const settingsSection = (S) =>
  S.listItem()
    .title('Settings')
    .icon(MdSettings)
    .child(
      S.list()
        .title('Site Settings')
        .items([
          S.listItem()
            .title('Metadata')
            .child(
              S.editor().title('Metadata').schemaType('siteSettings').documentId('siteSettings')
            ),
          S.listItem()
            .title('Home Page Params')
            .child(
              S.editor().title('Home Page Params').schemaType('homePage').documentId('homePage')
            ),
          S.listItem()
            .title('External Links')
            .icon(MdLink)
            .child(
              S.editor()
                .title('External Links')
                .schemaType('externalLinks')
                .documentId('externalLinks')
            ),
        ])
    )

///////////////////////
// Programming Section:
///////////////////////
const programmingSection = (S) =>
  S.listItem()
    .title('Programming')
    .child(
      S.list()
        .title('Programming')
        .items([
          S.listItem().title('Posts').child(S.documentTypeList('prgPost').title('Posts')),
          S.listItem().title('Tags').child(programmingTagsSection(S)),
        ])
    )

const programmingTagsSection = (S) =>
  S.list()
    .title('Tags')
    .items([
      S.listItem().title('Languages').child(S.documentTypeList('prgTag_lang')),
      S.listItem()
        .title('Frameworks & Other Technologies')
        .child(S.documentTypeList('prgTag_framework')),
      S.listItem().title('Project Type').child(S.documentTypeList('prgTag_project_type')),
    ])
