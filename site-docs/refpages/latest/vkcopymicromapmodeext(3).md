# VkCopyMicromapModeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyMicromapModeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyMicromapModeEXT - Micromap copy mode

Possible values of `mode` specifying additional operations to perform
during the copy, are:

// Provided by VK_EXT_opacity_micromap
typedef enum VkCopyMicromapModeEXT {
    VK_COPY_MICROMAP_MODE_CLONE_EXT = 0,
    VK_COPY_MICROMAP_MODE_SERIALIZE_EXT = 1,
    VK_COPY_MICROMAP_MODE_DESERIALIZE_EXT = 2,
    VK_COPY_MICROMAP_MODE_COMPACT_EXT = 3,
} VkCopyMicromapModeEXT;

* 
[VK_COPY_MICROMAP_MODE_CLONE_EXT](#) creates a direct copy of the
micromap specified in `src` into the one specified by `dst`.
The `dst` micromap **must** have been created with the same parameters
as `src`.

* 
[VK_COPY_MICROMAP_MODE_SERIALIZE_EXT](#) serializes the micromap to a
semi-opaque format which can be reloaded on a compatible implementation.

* 
[VK_COPY_MICROMAP_MODE_DESERIALIZE_EXT](#) deserializes the semi-opaque
serialization format in the buffer to the micromap.

* 
[VK_COPY_MICROMAP_MODE_COMPACT_EXT](#) creates a more compact version
of a micromap `src` into `dst`.
The micromap `dst` **must** have been created with a size at least as
large as that returned by [vkCmdWriteMicromapsPropertiesEXT](vkCmdWriteMicromapsPropertiesEXT.html) after
the build of the micromap specified by `src`.

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkCopyMemoryToMicromapInfoEXT](VkCopyMemoryToMicromapInfoEXT.html), [VkCopyMicromapInfoEXT](VkCopyMicromapInfoEXT.html), [VkCopyMicromapToMemoryInfoEXT](VkCopyMicromapToMemoryInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#VkCopyMicromapModeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
