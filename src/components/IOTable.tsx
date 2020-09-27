import React, { useCallback } from 'react'
import { DataTable, TableContainer, Table, TableHead, TableRow, TableSelectAll, TableHeader, TableBody, TableSelectRow, TableCell } from 'carbon-components-react'
import { IWatermark } from '../ts/type'
import Preview from './Preview'
import { range } from 'lodash'
import { getBytesSize } from '../ts/utils'

interface IOTableProps {
  name: string
  watermarkList: IWatermark[]
  selectedIndex: number[]
  setSelectedIndex: (list: number[]) => void
}

export default function IOTable(props: IOTableProps) {
  const {
    name,
    watermarkList,
    selectedIndex,
    setSelectedIndex,
  } = props

  const handleSelectAll = useCallback(() => {
    setSelectedIndex(selectedIndex.length ? [] : range(watermarkList.length))
  }, [selectedIndex, watermarkList, setSelectedIndex])

  const handleSelectRow = useCallback((index: number) => {
    const isIncluded = selectedIndex.includes(index)
    const list = isIncluded
      ? selectedIndex.filter(i => i !== index)
      : [...selectedIndex, index]
    setSelectedIndex(list)
  }, [selectedIndex, setSelectedIndex])

  return (
    <>
      <DataTable rows={[]} headers={[]}>
        {() => {
          return (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableSelectAll
                      id={`select-all-${name}`}
                      name={`select-all-${name}`}
                      checked={selectedIndex.length === watermarkList.length}
                      onSelect={handleSelectAll}
                    />
                    <TableHeader>预览</TableHeader>
                    <TableHeader>标题</TableHeader>
                    <TableHeader>大小</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {watermarkList.map((w, index) => (
                    <TableRow key={w.id} >
                      <TableSelectRow
                        id={`select-row-${index}-${name}`}
                        name={`select-row-${index}-${name}`}
                        ariaLabel=""
                        checked={selectedIndex.includes(index)}
                        onSelect={() => handleSelectRow(index)}
                      />
                      <TableCell>
                        {<div className="w-20"><Preview watermark={w} /></div>}
                      </TableCell>
                      <TableCell>{w.title}</TableCell>
                      <TableCell>{getBytesSize(JSON.stringify(w).length)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
        }}
      </DataTable>
    </>
  )
}