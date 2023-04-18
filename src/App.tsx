import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import ClearIcon from "@mui/icons-material/Clear";
import { saveAs } from "file-saver";
import { decode } from "base64-arraybuffer";

export const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const urlsRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 10,
    onDrop(accepted) {
      const fileNames = files.map((file) => file.name);
      const newFiles = accepted.filter(
        (file) => !fileNames.includes(file.name)
      );
      setFiles([...files, ...newFiles].slice(0, 10));
    },
  });

  const submit = () => {
    const urls = urlsRef.current?.value?.split("\n")?.filter(Boolean) || [];

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    urls.forEach((url) => formData.append("urls", url));

    setLoading(true);

    fetch("/api/convert", {
      body: formData,
      method: "post",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.count > 0 && res.zip) {
          return new Blob([decode(res.zip)]);
        } else {
          throw new Error("TData файлы не найдены.");
        }
      })
      .then((res) => saveAs(res, "sessions.zip"))
      .then(() => {
        setFiles([]);
        if (urlsRef.current?.value) {
          urlsRef.current.value = "";
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <Box
      maxWidth={1240}
      marginX="auto"
      marginTop={3}
      paddingX={{ xs: 0, sm: 5 }}
    >
      <Box height={90} display="flex">
        <Box>
          <Typography
            component="span"
            sx={{ color: "#0055B9" }}
            fontSize={{ xs: 30, sm: 40 }}
            fontWeight={900}
          >
            TD
          </Typography>
          <Typography
            component="span"
            sx={{ color: "#3F3F3F" }}
            fontSize={{ xs: 30, sm: 40 }}
            fontWeight={900}
          >
            ata конвертер
          </Typography>
          <Typography
            sx={{ color: "#3F3F3F" }}
            fontSize={{ xs: 18, sm: 24 }}
            lineHeight={0.5}
          >
            конвертер tdata в json+session
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "flex-start" }}
        gap={{ xs: 5, lg: 10 }}
        marginTop={{ xs: 0, sm: 5 }}
      >
        <Box display="flex" gap={2} flexDirection="column">
          <Box
            {...getRootProps()}
            width={500}
            maxWidth="90vw"
            height={213}
            border="3px solid rgba(0, 97, 210, 1)"
            borderRadius={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={2}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              flexBasis="40%"
            >
              <Box component="img" src="/dnd.png" />
              <Typography textAlign="center" color="#a9a9a9">
                {isDragActive
                  ? "Ловлю..."
                  : "Перетащите архивы с tdata в это поле"}
              </Typography>
            </Box>

            {!!files.length && (
              <Box
                overflow="hidden auto"
                alignSelf="flex-start"
                flexBasis="60%"
                height="100%"
                flexGrow={1}
              >
                {files.map((file) => (
                  <Box key={file.name} display="flex" gap={0.5}>
                    <IconButton
                      sx={{ width: 24, height: 24 }}
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFiles(
                          files.filter((currentFile) => currentFile !== file)
                        );
                      }}
                    >
                      <ClearIcon color="error" />
                    </IconButton>
                    <Typography textOverflow="ellipsis">{file.name}</Typography>
                  </Box>
                ))}
              </Box>
            )}
            <input {...getInputProps()} />
          </Box>
          <TextField
            inputRef={urlsRef}
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
              alignSelf: "center",
              borderRadius: 2,
              background: "#0061D2 !important",
              color: "white",
              fontSize: 14,
            }}
            variant="contained"
            onClick={submit}
          >
            Конвертировать
          </Button>
          {loading && <LinearProgress />}
        </Box>
        <Typography padding={{ xs: 3, md: 0 }}>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software. Why do
          we use it?
        </Typography>
      </Box>
    </Box>
  );
};
