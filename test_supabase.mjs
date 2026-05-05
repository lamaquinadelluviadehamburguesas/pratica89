const supabaseUrl = "https://bapheckkvfwqeadfusxf.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhcGhlY2trdmZ3cWVhZGZ1c3hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNTk5MjksImV4cCI6MjA4ODgzNTkyOX0.cvb1M_XiXkALjAVjovLjq_DCHe7xHDRUHTh0OEh8Vqo"

async function testSelect(table, cols) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${cols}`, {
    headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }
  })
  if (!res.ok) {
     const body = await res.json()
     console.log(`Failed for ${cols}:`, body.message)
  } else {
     console.log(`Success for ${cols}`)
  }
}

async function run() {
  await testSelect("productos", "id_producto,nombre_producto,descripcion_producto,categoria_producto,precio_venta,url_imagen")
  await testSelect("productos", "id_producto,nombre_producto")
  await testSelect("productos", "url_imagen")
}
run()
