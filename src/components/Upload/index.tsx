import React, { useState } from 'react';
import { Button, Image } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import axios from 'axios';
import { resolve } from 'path';
// import styles from './index.module.less'
const styles = require('./index.module.less');
import API from '@/utils/api';

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file); // 读取文件并转换为Data URL（Base64）
  });
}

const Upload:React.FC = (props: any) => {
  const { multiple = true, accept, capture } = props;
  const [fileList, setFileList] = useState([]);

  const uploadRemote = async (file) => {
    return new Promise(async (resolve) => {
      const chunkSize  = 1024 * 1024 * 2;
      const total = Math.ceil(file.size / chunkSize)
      let current = 0;
      let progress = 0;
      let res = {}
      while (total > current) {
        const chunk = file.slice(current * chunkSize, (current + 1) * chunkSize)
        const formData = new FormData();
        formData.append('fileName', file.name);
        formData.append('fileType', file.type);
        formData.append('chunkIndex', current);
        formData.append('totalChunks', total);
        formData.append('file', chunk);
        res = await API.post('/upload/file', formData, {headers: { 'content-type': 'formData' } });
        current += 1;
        progress = Math.min(Math.round((current * chunkSize / file.size) * 100), 100)
      }
      resolve({ progress,...res })
    })
  }

  const onUpload = async (e) => {
    const files = e.target.files;
    Object.values(files).forEach(async (file) => {
      let base64 = file;
      // if (file.type.includes('image')) base64 = await fileToBase64(file);
      const { src, progress } = await uploadRemote(file)
      setFileList([...fileList, { type: file.type.split('/')[0], src: base64, progress, path: src }])
    });
  }

  return (
    <div className={styles.upload_view}>
      <Button type="primary" icon={<CloudUploadOutlined />} size={'middle'} onClick={onUpload}>
        Upload
        <input className={styles.upload_input} type="file" onChange={onUpload} multiple={multiple} />
      </Button>

      <div className="flex-row">
        {
          fileList?.map?.((item, i) => (
            <div key={i}>
              {item?.type === 'video' && (<video style={{ width: '200px' }} src={item.src} />)}
              {item?.type === 'image' && (<Image width={200} src={item.src} />)}
              <div>进度： {item.progress || 0} %</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Upload;
