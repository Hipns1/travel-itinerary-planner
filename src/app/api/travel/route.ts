import { pool } from '@/core/lib/mysql'
import { NextResponse } from 'next/server'
import { ItemTravelProps } from './types'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const travelId = searchParams.get('travelId')

    if (!travelId) {
      return NextResponse.json({ message: 'travelId is required' }, { status: 400 })
    }

    const rows: ItemTravelProps[] = await pool.query('SELECT * FROM travels WHERE id = ?', [travelId])

    if (rows.length > 0) {
      return NextResponse.json(rows[0])
    } else {
      return NextResponse.json({ message: 'Travel not found' }, { status: 404 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error fetching travel' }, { status: 500 })
  }
}
