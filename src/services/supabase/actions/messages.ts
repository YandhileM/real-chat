"use server"

import { getCurrentUser } from "../lib/getCurrentUser"
import { createAdminClient } from "../server"

export type Message = {
  id: string
  text: string
  created_at: string
  author_id: string
  author: {
    name: string
    image_url: string | null
  }
}

