import React, { useState } from 'react';
import { Input, Icon } from 'semantic-ui-react';

const PasswordInput = ({ ...props }) => {
  const [passwordMode, setPasswordMode] = useState(true);

  return (
    <Input
      icon={
        <Icon
          name={passwordMode ? 'eye' : 'eye slash'}
          link
          onClick={() => setPasswordMode(!passwordMode)}
        />
      }
      type={passwordMode ? 'password' : 'text'}
      {...props}
    />
  );
};

export default PasswordInput;
