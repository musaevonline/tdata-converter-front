import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDropzone } from 'react-dropzone'

export const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 10, onDrop(accepted) {
      setFiles([...files, ...accepted])
    }
  })

  return (
    <Box maxWidth={1240} marginX="auto">
      <Box
        height={90}
        display="flex"
        alignItems="center"
      >
        <Typography
          component="span"
          sx={{ color: "#0055B9" }}
          fontSize={{ xs: 30, md: 40 }}
          fontWeight={900}
        >
          TD
        </Typography>
        <Typography
          component="span"
          sx={{ color: "#3F3F3F" }}
          fontSize={{ xs: 30, md: 40 }}
          fontWeight={900}
        >
          ata конвертер
        </Typography>
      </Box>
      <Box display="flex" gap={10}>
        <Box
          display="flex"
          gap={2}
          flexDirection="column"
        >
          <Box
            {...getRootProps()}
            width={500}
            maxWidth="90vw"
            height={213}
            border="3px solid rgba(0, 97, 210, 1)"
            borderRadius={3}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <input {...getInputProps()} />
            {
              files.length ? (
                <Box sx={{ overflowY: 'auto' }}>
                  {files.map(file => <Typography>{file.name}</Typography>)}
                </Box>
              ) : isDragActive ? (
                <Typography>Ловлю... Ловлю...</Typography>
              ) : (
                <>
                  <Box component="img" src="/dnd.png" />
                  <Typography>Перетащите архивы с tdata в это поле</Typography>
                </>
              )
            }
          </Box>
          <TextField
            placeholder="Сюда можете добавить ссылки на яндекс/mega/drive облака"
            multiline
            rows={9}
            sx={{
              width: 500,
              maxWidth: "90vw",
              border: "3px solid rgba(0, 97, 210, 1)",
              borderRadius: 3,
              fieldset: {
                border: "none",
              },
            }}
          />
          <Button
            sx={{
              width: 200,
              height: 40,
              alignSelf: 'center',
              borderRadius: 2,
              background: "#0061D2 !important",
              color: "white",
              fontSize: 14,
            }}
            variant="contained"
          >
            Конвертировать
          </Button>
        </Box>
        <Typography>What is Lorem Ipsum?
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software.
          Why do we use it?<br/><br/>

          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Typography>
      </Box>
    </Box>
  );
};
