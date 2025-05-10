import { NextResponse } from 'next/server'
import { MasterOptions } from '@/app/api/masters'
import { pool } from '@/core/lib/mysql'

export async function GET() {
  try {
    const rows: MasterOptions[] = await pool.query('SELECT value, label FROM activities')

    if (rows.length > 0) {
      return NextResponse.json(rows)
    } else {
      return NextResponse.json({ message: 'No records found' })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 })
  }
}
