import React, { Component, useState, useEffect } from 'react';
import Directory, { Directories } from './Directory/Directory';
import Dependency from './Dependency/Dependency'
import Port from './Port/Port';
import DependencyList, { Dependencies } from './Dependency/DependencyList';
import { Info } from './SettingApp';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

function SettingInfo({ info, onRemove, onUpdate }: {
  info: Info,
  onRemove: (id: string) => void,
  onUpdate: (id: string, info: Info) => void
}, props) {
  const handleRemove = () => {
    onRemove(info.url);
  }
  const style = {
    border: '1px solid black',
    padding: '8px',
    margin: '8px'
  };
  
  const {
    name, url, docker
  } = info;
  
  const [directories, setDirectories] = useState(info.directories);
  const [dependencies, setDependencies] = useState(info.dependencies);
  const [ports, setPorts] = useState(info.ports);
  const [exps, setExps] = useState(info.openExplorerPerm);
  
  const handleExps = (e) => {
    exps ? setExps(false) : setExps(true);
  }

  const styleA = {
    color: 'white',
  }

  useEffect(() => {
    onUpdate(info.url, {
      ...info,
      directories,
      ports,
      dependencies,
      openExplorerPerm: exps
    });
  }, [directories, ports, dependencies, exps]);
  const inlinedisplay = {
    display: "inline"
  }
  return (
    <div style={style}>
      <h2 style={inlinedisplay}>{name}</h2>{'  '}
      {url}{'  '}
      <Button onClick={handleRemove}>
        <DeleteIcon style={styleA} fontSize="small" />
      </Button>
      <div>
        <h3>Directory</h3>
        <Directory directories={directories} onUpdate={setDirectories} />
        {!docker ? <h3>Dependency</h3> : undefined}
        {!docker ? <Dependency dependencies={dependencies} onUpdate={setDependencies} /> : undefined}
        {docker ? <h3>Port</h3> : undefined}
        {docker ? <Port ports={ports} onUpdate={setPorts} />: undefined}
        <h3>openExplorerPerm 
          <Checkbox
            checked={exps}
            onClick={handleExps}
            inputProps={{ 'aria-label': 'primary checkbox' }}
            name="openExplorerPerm"
          />
        </h3>
      </div>
    </div>
  );
}

export default SettingInfo;