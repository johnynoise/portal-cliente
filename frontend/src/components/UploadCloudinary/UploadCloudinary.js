export async function uploadToCloudinary(file) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "portal-clientes"); // nome do preset criado
  formData.append("cloud_name", "dnth50woo");     // substitua pelo seu cloud name

  const response = await fetch("https://api.cloudinary.com/v1_1/dnth50woo/image/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer upload da imagem para o Cloudinary");
  }

  const data = await response.json();
  return data.secure_url; // retorna a URL da imagem hospedada
}
