import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import ClearIcon from '@mui/icons-material/Clear';
import { saveAs } from 'file-saver';
import { useSnackbar } from 'notistack';
import { process } from './services';

export const App: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = useState<File[]>([]);
  const urlsRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 10,
    onDrop(accepted) {
      const fileNames = files.map((file) => file.name);
      const newFiles = accepted.filter(
        (file) => !fileNames.includes(file.name),
      );
      setFiles([...files, ...newFiles].slice(0, 10));
    },
  });

  const submit = () => {
    const urls = urlsRef.current?.value?.split('\n')?.filter(Boolean) || [];

    const count = urls.length + files.length;
    if (!count) {
      return enqueueSnackbar('Загрузите архивы/ссылки для конвертации.', {
        variant: 'info',
      });
    }

    setLoading(true);
    process(urls, files)
      .then((res) => {
        if (res.count > 0 && res.zip) {
          saveAs(new Blob([res.zip]), 'sessions.zip');
          return res;
        }
        throw new Error('TData файлы не найдены.');
      })
      .then((res) =>
        enqueueSnackbar(`Успешно! Конвертировано сессий - ${res.count}.`, {
          variant: 'success',
        }),
      )
      .then(() => {
        setFiles([]);
        if (urlsRef.current?.value) {
          urlsRef.current.value = '';
        }
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar('Ошибка. Конвертировано сессий - 0', {
          variant: 'error',
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box
      maxWidth={1240}
      marginX="auto"
      marginTop={3}
      paddingX={{ xs: 0, sm: 5 }}
    >
      <Box
        height={90}
        display="flex"
        justifyContent={{ xs: 'center', md: 'flex-start' }}
      >
        <Box>
          <Typography component="h1">
            <Box
              component="span"
              sx={{ color: '#0055B9' }}
              fontSize={{ xs: 30, sm: 40 }}
              fontWeight={900}
            >
              TD
            </Box>
            <Box
              component="span"
              sx={{ color: '#3F3F3F' }}
              fontSize={{ xs: 30, sm: 40 }}
              fontWeight={900}
            >
              ata конвертер
            </Box>
          </Typography>
          <Typography
            component="h2"
            sx={{ color: '#3F3F3F' }}
            fontSize={{ xs: 18, sm: 24 }}
            lineHeight={0.5}
          >
            конвертер tdata в json+session
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'center', md: 'flex-start' }}
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
                  ? 'Ловлю...'
                  : 'Перетащите архивы с tdata в это поле'}
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
                          files.filter((currentFile) => currentFile !== file),
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
            placeholder="Сюда можете добавить ссылки на Яндекс / Mega / Google Drive облака"
            multiline
            rows={9}
            sx={{
              width: 500,
              maxWidth: '90vw',
              border: '3px solid rgba(0, 97, 210, 1)',
              borderRadius: 3,
              fieldset: {
                border: 'none',
              },
            }}
          />
          <Button
            disabled={loading}
            sx={{
              width: 200,
              height: 40,
              alignSelf: 'center',
              borderRadius: 2,
              background: '#0061D2 !important',
              color: 'white',
              fontSize: 14,
            }}
            variant="contained"
            onClick={submit}
          >
            Конвертировать
          </Button>
          {loading && <LinearProgress />}
        </Box>
        <Box padding={{ xs: 3, md: 0 }}>
          <Typography
            component="h3"
            fontSize={18}
            textAlign={{ xs: 'center', md: 'left' }}
          >
            Инструкция
          </Typography>
          <Typography>
            <br />
            Загрузите в верхнее поле ZIP / RAR архивы с TData, либо вставьте
            ссылки на облака Yandex / Mega / Google Drive в нижнее поле.
            Максимально допустимое суммарное количество сессий для конвертации -
            10.
            <br />
            <br />
            Конвертация является 100% безопасной для аккаунтов, т.к алгоритм не
            подключается к телеграм и не производит вход.
            <br />
            <br />
            Файлы сессий не сохраняются и не кешируются.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
