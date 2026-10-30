# VK_NV_external_memory(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_external_memory.html

## Table of Contents

- [Name](#_name)
- [VK_NV_external_memory](#VK_NV_external_memory)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_external_memory - device extension

**Name String**

`VK_NV_external_memory`

**Extension Type**

Device extension

**Registered Extension Number**

57

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_NV_external_memory_capabilities](VK_NV_external_memory_capabilities.html)

**Deprecation State**

* 
*Deprecated* by
[VK_KHR_external_memory](VK_KHR_external_memory.html)
extension

Which in turn was *promoted* to
[Vulkan 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1-promotions)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_external_memory] @cubanismo%0A*Here describe the issue or question you have about the VK_NV_external_memory extension*)

**Last Modified Date**

2016-08-19

**IP Status**

No known IP claims.

**Contributors**

* 
James Jones, NVIDIA

* 
Carsten Rohde, NVIDIA

Applications may wish to export memory to other Vulkan instances or other
APIs, or import memory from other Vulkan instances or other APIs to enable
Vulkan workloads to be split up across application module, process, or API
boundaries.
This extension enables applications to create exportable Vulkan memory
objects such that the underlying resources can be referenced outside the
Vulkan instance that created them.

* 
Extending [VkImageCreateInfo](VkImageCreateInfo.html):

[VkExternalMemoryImageCreateInfoNV](VkExternalMemoryImageCreateInfoNV.html)

Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

* 
[VkExportMemoryAllocateInfoNV](VkExportMemoryAllocateInfoNV.html)

* 
`VK_NV_EXTERNAL_MEMORY_EXTENSION_NAME`

* 
`VK_NV_EXTERNAL_MEMORY_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_EXPORT_MEMORY_ALLOCATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_IMAGE_CREATE_INFO_NV](VkStructureType.html)

1) If memory objects are shared between processes and APIs, is this
considered aliasing according to the rules outlined in the
[Memory Aliasing](../../../../spec/latest/chapters/resources.html#resources-memory-aliasing) section?

**RESOLVED**: Yes, but strict exceptions to the rules are added to allow some
forms of aliasing in these cases.
Further, other extensions may build upon these new aliasing rules to define
specific support usage within Vulkan for imported native memory objects, or
memory objects from other APIs.

2) Are new image layouts or metadata required to specify image layouts and
layout transitions compatible with non-Vulkan APIs, or with other instances
of the same Vulkan driver?

**RESOLVED**: No.
Separate instances of the same Vulkan driver running on the same GPU should
have identical internal layout semantics, so applications have the tools
they need to ensure views of images are consistent between the two
instances.
Other APIs will fall into two categories: Those that are Vulkan compatible
(a term to be defined by subsequent interopability extensions), or Vulkan
incompatible.
When sharing images with Vulkan incompatible APIs, the Vulkan image must be
transitioned to the [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) layout before handing it
off to the external API.

Note this does not attempt to address cross-device transitions, nor
transitions to engines on the same device which are not visible within the
Vulkan API.
Both of these are beyond the scope of this extension.

    // TODO: Write some sample code here.

* 
Revision 1, 2016-08-19 (James Jones)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_external_memory).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
