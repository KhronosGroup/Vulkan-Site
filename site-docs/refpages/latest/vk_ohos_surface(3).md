# VK_OHOS_surface(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_OHOS_surface.html

## Table of Contents

- [Name](#_name)
- [VK_OHOS_surface](#VK_OHOS_surface)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Base Types](#_new_base_types)
- [New_Base_Types](#_new_base_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_OHOS_surface - instance extension

**Name String**

`VK_OHOS_surface`

**Extension Type**

Instance extension

**Registered Extension Number**

588

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Contact**

* 
Weilan Chen [wchen-h](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_OHOS_surface] @wchen-h%0A*Here describe the issue or question you have about the VK_OHOS_surface extension*)

**Last Modified Date**

2025-05-16

**IP Status**

No known IP claims.

**Contributors**

* 
Weilan Chen, Huawei

* 
Zehui Lin, Huawei

* 
Pan Gao, Huawei

* 
Zhao Zhang, Huawei

* 
Yang Shi, Huawei

The `VK_OHOS_surface` extension is an instance extension.
It provides a mechanism to create a [VkSurfaceKHR](VkSurfaceKHR.html) object (defined by
the `[VK_KHR_surface](VK_KHR_surface.html)` extension) that refers to an
`OHNativeWindow`, the native surface type of Open Harmony OS.
Common consumer endpoints for `OHNativeWindows` are the system window
compositor, video encoders, and application-specific compositors.

* 
`OHNativeWindow`

* 
[vkCreateSurfaceOHOS](vkCreateSurfaceOHOS.html)

* 
[VkSurfaceCreateInfoOHOS](VkSurfaceCreateInfoOHOS.html)

* 
[VkSurfaceCreateFlagsOHOS](VkSurfaceCreateFlagsOHOS.html)

* 
`VK_OHOS_SURFACE_EXTENSION_NAME`

* 
`VK_OHOS_SURFACE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_SURFACE_CREATE_INFO_OHOS](VkStructureType.html)

* 
Revision 1, 2025-05-19 (Weilan Chen)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_OHOS_surface).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
