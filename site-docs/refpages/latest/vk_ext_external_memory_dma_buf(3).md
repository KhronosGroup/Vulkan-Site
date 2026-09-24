# VK_EXT_external_memory_dma_buf(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_external_memory_dma_buf.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_external_memory_dma_buf](#VK_EXT_external_memory_dma_buf)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_external_memory_dma_buf - device extension

**Name String**

`VK_EXT_external_memory_dma_buf`

**Extension Type**

Device extension

**Registered Extension Number**

126

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_external_memory_fd](VK_KHR_external_memory_fd.html)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_external_memory_dma_buf] @cubanismo%0A*Here describe the issue or question you have about the VK_EXT_external_memory_dma_buf extension*)

**Last Modified Date**

2017-10-10

**IP Status**

No known IP claims.

**Contributors**

* 
Lina Versace, Google

* 
James Jones, NVIDIA

* 
Faith Ekstrand, Intel

A `dma_buf` is a type of file descriptor, defined by the Linux kernel,
that allows sharing memory across kernel device drivers and across
processes.
This extension enables applications to import a `dma_buf` as
[VkDeviceMemory](VkDeviceMemory.html), to export [VkDeviceMemory](VkDeviceMemory.html) as a `dma_buf`, and
to create [VkBuffer](VkBuffer.html) objects that **can** be bound to that memory.

* 
`VK_EXT_EXTERNAL_MEMORY_DMA_BUF_EXTENSION_NAME`

* 
`VK_EXT_EXTERNAL_MEMORY_DMA_BUF_SPEC_VERSION`

* 
Extending [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html):

[VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

1) How does the application, when creating a [VkImage](VkImage.html) that it intends
to bind to `dma_buf` [VkDeviceMemory](VkDeviceMemory.html) containing an externally
produced image, specify the memory layout (such as row pitch and DRM format
modifier) of the [VkImage](VkImage.html)? In other words, how does the application
achieve behavior comparable to that provided by
[`EGL_EXT_image_dma_buf_import`](https://registry.khronos.org/EGL/extensions/EXT/EGL_EXT_image_dma_buf_import.txt)
and
[`EGL_EXT_image_dma_buf_import_modifiers`](https://registry.khronos.org/EGL/extensions/EXT/EGL_EXT_image_dma_buf_import_modifiers.txt)
?

**RESOLVED**: Features comparable to those in
[`EGL_EXT_image_dma_buf_import`](https://registry.khronos.org/EGL/extensions/EXT/EGL_EXT_image_dma_buf_import.txt)
and
[`EGL_EXT_image_dma_buf_import_modifiers`](https://registry.khronos.org/EGL/extensions/EXT/EGL_EXT_image_dma_buf_import_modifiers.txt)
will be provided by an extension layered atop this one.

2) Without the ability to specify the memory layout of external `dma_buf`
images, how is this extension useful?

**RESOLVED**: This extension provides exactly one new feature: the ability to
import/export between `dma_buf` and [VkDeviceMemory](VkDeviceMemory.html).
This feature, together with features provided by
`[VK_KHR_external_memory_fd](VK_KHR_external_memory_fd.html)`, is sufficient to bind a [VkBuffer](VkBuffer.html)
to `dma_buf`.

* 
Revision 1, 2017-10-10 (Lina Versace)

Squashed internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_external_memory_dma_buf).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
