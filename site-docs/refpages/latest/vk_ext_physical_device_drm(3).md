# VK_EXT_physical_device_drm(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_physical_device_drm.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_physical_device_drm](#VK_EXT_physical_device_drm)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [References](#_references)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_physical_device_drm - device extension

**Name String**

`VK_EXT_physical_device_drm`

**Extension Type**

Device extension

**Registered Extension Number**

354

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Simon Ser [emersion](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_physical_device_drm] @emersion%0A*Here describe the issue or question you have about the VK_EXT_physical_device_drm extension*)

**Last Modified Date**

2021-06-09

**IP Status**

No known IP claims.

**Contributors**

* 
Simon Ser

This extension provides new facilities to query DRM properties for physical
devices, enabling users to match Vulkan physical devices with DRM nodes on
Linux.

Its functionality closely overlaps with
`EGL_EXT_device_drm`[1](../../../../spec/latest/appendices/extensions.html#VK_EXT_physical_device_drm-fn1).
Unlike the EGL extension, this extension does not expose a string containing
the name of the device file and instead exposes device minor numbers.

DRM defines multiple device node types.
Each physical device may have one primary node and one render node
associated.
Physical devices may have no primary node (e.g. if the device does not have
a display subsystem), may have no render node (e.g. if it is a software
rendering engine), or may have neither (e.g. if it is a software rendering
engine without a display subsystem).

To query DRM properties for a physical device, chain
[VkPhysicalDeviceDrmPropertiesEXT](VkPhysicalDeviceDrmPropertiesEXT.html) to [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html).

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceDrmPropertiesEXT](VkPhysicalDeviceDrmPropertiesEXT.html)

* 
`VK_EXT_PHYSICAL_DEVICE_DRM_EXTENSION_NAME`

* 
`VK_EXT_PHYSICAL_DEVICE_DRM_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DRM_PROPERTIES_EXT](VkStructureType.html)

[`EGL_EXT_device_drm`](https://registry.khronos.org/EGL/extensions/EXT/EGL_EXT_device_drm.txt)

* 
Revision 1, 2021-06-09

First stable revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_physical_device_drm).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
