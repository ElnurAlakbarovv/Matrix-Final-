import * as yup from "yup";

export const blogSchema = yup.object().shape({
  title: yup.string().required("Başlıq mütləqdir"),
  description: yup.string().required("Açıqlama mütləqdir").min(20, "Açıqlama ən azı 20 simvol olmalıdır"),
  date: yup.date().required("Tarix mütləqdir"),
  image: yup.mixed().required("Şəkil mütləqdir"),
});
