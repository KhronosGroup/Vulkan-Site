# VK_EXT_acquire_drm_display(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_acquire_drm_display.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_acquire_drm_display](#VK_EXT_acquire_drm_display)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_acquire_drm_display - instance extension

**Name String**

`VK_EXT_acquire_drm_display`

**Extension Type**

Instance extension

**Registered Extension Number**

286

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_EXT_direct_mode_display](VK_EXT_direct_mode_display.html)

**Contact**

* 
Drew DeVault [sir@cmpwn.com](mailto:sir@cmpwn.com)

**Last Modified Date**

2021-06-09

**IP Status**

No known IP claims.

**Contributors**

* 
Simon Zeni, Status Holdings, Ltd.

This extension allows an application to take exclusive control of a display
using the Direct Rendering Manager (DRM) interface.
When acquired, the display will be under full control of the application
until the display is either released or the connector is unplugged.

* 
[vkAcquireDrmDisplayEXT](vkAcquireDrmDisplayEXT.html)

* 
[vkGetDrmDisplayEXT](vkGetDrmDisplayEXT.html)

* 
`VK_EXT_ACQUIRE_DRM_DISPLAY_EXTENSION_NAME`

* 
`VK_EXT_ACQUIRE_DRM_DISPLAY_SPEC_VERSION`

None.

* 
Revision 1, 2021-05-11 (Simon Zeni)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_acquire_drm_display).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
