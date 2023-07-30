import React, { useEffect, useRef } from 'react';
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';

const TagsInput = ({ name, tagsData }) => {
  const tagInputRef = useRef(null);

  useEffect(() => {
    if (tagInputRef.current) {
      new Tagify(tagInputRef.current, {
        // enforceWhitelist: true,
        whitelist: tagsData,
      });
    }
  }, [tagsData]);

  return <input type="text" name={name} ref={tagInputRef} />;
};

export default TagsInput;