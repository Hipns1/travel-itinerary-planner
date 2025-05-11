import { pool } from '@/core/lib/mysql'
import { NextResponse } from 'next/server'
import { ItemTravelProps } from './types'
import { v4 as uuidv4 } from 'uuid'
import { toMySQLDatetime } from '../utils'

export async function GET() {
  try {
    const rows: ItemTravelProps[] = await pool.query('SELECT * FROM travels')

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

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const id = uuidv4()

    const data: Omit<ItemTravelProps, 'id'> = body
    const { name, description, startDate, endDate } = data

    await pool.query(
      `INSERT INTO travels 
      (id, name, description, startDate, endDate) 
      VALUES (?, ?, ?, ?, ?)`,
      [id, name, description ?? null, toMySQLDatetime(startDate), toMySQLDatetime(endDate)]
    )

    return NextResponse.json({ message: 'Travel created', id }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error creating travel' }, { status: 500 })
  }
}

type QueryResult = {
  affectedRows: number
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    const result: QueryResult = await pool.query('DELETE FROM travels WHERE id = ?', [id])

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: 'Travel deleted successfully' }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Travel not found' }, { status: 404 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error deleting travel' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, name, description, startDate, endDate } = body as ItemTravelProps

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    const result: QueryResult = await pool.query(
      `UPDATE travels SET 
        name = ?, 
        description = ?, 
        startDate = ?, 
        endDate = ? 
      WHERE id = ?`,
      [name, description ?? null, toMySQLDatetime(startDate), toMySQLDatetime(endDate), id]
    )

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: 'Travel updated successfully' }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Travel not found' }, { status: 404 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error updating travel' }, { status: 500 })
  }
}
