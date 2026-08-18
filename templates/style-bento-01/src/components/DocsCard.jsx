// Derived from index slug: magicui-file-tree
// Author repo: https://github.com/magicuidesign/magicui
// Keeps the source's nested folder/file tree with an active selection;
// reimplemented as static markup on native lists (no runtime dependency),
// with folders as semantic groups and hairline guide rails.

import { Card } from './Effects.jsx'

function FolderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M1.5 4.5v8h13v-6.5H8L6.5 4.5h-5z" strokeLinejoin="round" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M3.5 1.5h6l3 3v10h-9v-13z" strokeLinejoin="round" />
      <path d="M9.5 1.5v3h3" strokeLinejoin="round" />
    </svg>
  )
}

export default function DocsCard() {
  return (
    <Card span="b4" order={2} className="flex flex-col gap-4">
      <p className="card-label">Team docs, organized like your head</p>
      <ul className="tree" aria-label="Workspace documents">
        <li>
          <span className="tree-row font-semibold"><FolderIcon /> Product</span>
          <ul>
            <li><span className="tree-row tree-active"><FileIcon /> Launch plan, v4</span></li>
            <li><span className="tree-row"><FileIcon /> Pricing notes</span></li>
            <li><span className="tree-row"><FileIcon /> April retro</span></li>
          </ul>
        </li>
        <li>
          <span className="tree-row font-semibold"><FolderIcon /> Design</span>
          <ul>
            <li><span className="tree-row"><FileIcon /> Brand refresh</span></li>
          </ul>
        </li>
        <li>
          <span className="tree-row font-semibold"><FolderIcon /> Engineering</span>
          <ul>
            <li><span className="tree-row"><FileIcon /> API v2 spec</span></li>
            <li><span className="tree-row"><FileIcon /> On-call runbook</span></li>
          </ul>
        </li>
      </ul>
      <p className="m-0 mt-auto text-sm leading-6 text-mist">
        Every doc opens beside its thread. Comments land in the conversation, not in a sidebar nobody reads.
      </p>
    </Card>
  )
}
