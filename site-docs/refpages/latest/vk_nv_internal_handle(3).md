# VK_NV_internal_handle(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_internal_handle.html

## Table of Contents

- [Name](#_name)
- [VK_NV_internal_handle](#VK_NV_internal_handle)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Base Types](#_new_base_types)
- [New_Base_Types](#_new_base_types)
- [New Commands](#_new_commands)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_internal_handle - device extension

**Name String**

`VK_NV_internal_handle`

**Extension Type**

Device extension

**Registered Extension Number**

668

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Chris Lentini [clentini](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_internal_handle] @clentini%0A*Here describe the issue or question you have about the VK_NV_internal_handle extension*)

**Extension Proposal**

[VK_NV_internal_handle](../../../../features/latest/features/proposals/VK_NV_internal_handle.html)

**Last Modified Date**

2026-10-27

**IP Status**

No known IP claims.

**Contributors**

* 
Chris Lentini, NVIDIA

This extension provides a mechanism for applications to obtain opaque
internal driver handles for certain Vulkan objects.
These handles are not consumed by any Vulkan command.
Applications **must** not dereference them, and **must** only pass them to
external APIs that accept them.

The extension defines `VkInternalHandleNV` and adds four commands for
obtaining internal handles from different dispatchable object types:

* 
[vkGetPhysicalDeviceInternalHandleNV](vkGetPhysicalDeviceInternalHandleNV.html) for `VkPhysicalDevice`

* 
[vkGetDeviceInternalHandleNV](vkGetDeviceInternalHandleNV.html) for `VkDevice`

* 
[vkGetQueueInternalHandleNV](vkGetQueueInternalHandleNV.html) for `VkQueue`

* 
[vkGetCommandBufferInternalHandleNV](vkGetCommandBufferInternalHandleNV.html) for `VkCommandBuffer`

See the [NV Internal Handles](../../../../spec/latest/chapters/VK_NV_internal_handle/VK_NV_internal_handle.html#nv-internal-handles) chapter for details of
handle lifetime, synchronization requirements, and command buffer query
states.

* 
`VkInternalHandleNV`

* 
[vkGetCommandBufferInternalHandleNV](vkGetCommandBufferInternalHandleNV.html)

* 
[vkGetDeviceInternalHandleNV](vkGetDeviceInternalHandleNV.html)

* 
[vkGetPhysicalDeviceInternalHandleNV](vkGetPhysicalDeviceInternalHandleNV.html)

* 
[vkGetQueueInternalHandleNV](vkGetQueueInternalHandleNV.html)

* 
`VK_NV_INTERNAL_HANDLE_EXTENSION_NAME`

* 
`VK_NV_INTERNAL_HANDLE_SPEC_VERSION`

None.

* 
Revision 1, 2026-10-27 (Chris Lentini)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_internal_handle).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
