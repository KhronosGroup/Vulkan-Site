# VK_FUCHSIA_buffer_collection(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_FUCHSIA_buffer_collection.html

## Table of Contents

- [Name](#_name)
- [VK_FUCHSIA_buffer_collection](#VK_FUCHSIA_buffer_collection)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_FUCHSIA_buffer_collection - device extension

**Name String**

`VK_FUCHSIA_buffer_collection`

**Extension Type**

Device extension

**Registered Extension Number**

367

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_FUCHSIA_external_memory](VK_FUCHSIA_external_memory.html)

and

     [VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_EXT_debug_report

**Contact**

* 
John Rosasco [rosasco](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_FUCHSIA_buffer_collection] @rosasco%0A*Here describe the issue or question you have about the VK_FUCHSIA_buffer_collection extension*)

**Last Modified Date**

2021-09-23

**IP Status**

No known IP claims.

**Contributors**

* 
Craig Stout, Google

* 
John Bauman, Google

* 
John Rosasco, Google

A buffer collection is a collection of one or more buffers which were
allocated together as a group and which all have the same properties.
These properties describe the buffers' internal representation such as its
dimensions and memory layout.
This ensures that all of the buffers can be used interchangeably by tasks
that require swapping among multiple buffers, such as double-buffered
graphics rendering.

By sharing such a collection of buffers between components, communication
about buffer lifecycle can be made much simpler and more efficient.
For example, when a content producer finishes writing to a buffer, it can
message the consumer of the buffer with the buffer index, rather than
passing a handle to the shared memory.

On Fuchsia, the Sysmem service uses buffer collections as a core construct
in its design.
VK_FUCHSIA_buffer_collection is the Vulkan extension that allows Vulkan
applications to interoperate with the Sysmem service on Fuchsia.

* 
[VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html)

* 
[vkCreateBufferCollectionFUCHSIA](vkCreateBufferCollectionFUCHSIA.html)

* 
[vkDestroyBufferCollectionFUCHSIA](vkDestroyBufferCollectionFUCHSIA.html)

* 
[vkGetBufferCollectionPropertiesFUCHSIA](vkGetBufferCollectionPropertiesFUCHSIA.html)

* 
[vkSetBufferCollectionBufferConstraintsFUCHSIA](vkSetBufferCollectionBufferConstraintsFUCHSIA.html)

* 
[vkSetBufferCollectionImageConstraintsFUCHSIA](vkSetBufferCollectionImageConstraintsFUCHSIA.html)

* 
[VkBufferCollectionConstraintsInfoFUCHSIA](VkBufferCollectionConstraintsInfoFUCHSIA.html)

* 
[VkBufferCollectionCreateInfoFUCHSIA](VkBufferCollectionCreateInfoFUCHSIA.html)

* 
[VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html)

* 
[VkBufferConstraintsInfoFUCHSIA](VkBufferConstraintsInfoFUCHSIA.html)

* 
[VkImageConstraintsInfoFUCHSIA](VkImageConstraintsInfoFUCHSIA.html)

* 
[VkImageFormatConstraintsInfoFUCHSIA](VkImageFormatConstraintsInfoFUCHSIA.html)

* 
[VkSysmemColorSpaceFUCHSIA](VkSysmemColorSpaceFUCHSIA.html)

* 
Extending [VkBufferCreateInfo](VkBufferCreateInfo.html):

[VkBufferCollectionBufferCreateInfoFUCHSIA](VkBufferCollectionBufferCreateInfoFUCHSIA.html)

Extending [VkImageCreateInfo](VkImageCreateInfo.html):

* 
[VkBufferCollectionImageCreateInfoFUCHSIA](VkBufferCollectionImageCreateInfoFUCHSIA.html)

Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

* 
[VkImportMemoryBufferCollectionFUCHSIA](VkImportMemoryBufferCollectionFUCHSIA.html)

* 
[VkImageConstraintsInfoFlagBitsFUCHSIA](VkImageConstraintsInfoFlagBitsFUCHSIA.html)

* 
[VkImageConstraintsInfoFlagsFUCHSIA](VkImageConstraintsInfoFlagsFUCHSIA.html)

* 
[VkImageFormatConstraintsFlagsFUCHSIA](VkImageFormatConstraintsFlagsFUCHSIA.html)

* 
`VK_FUCHSIA_BUFFER_COLLECTION_EXTENSION_NAME`

* 
`VK_FUCHSIA_BUFFER_COLLECTION_SPEC_VERSION`

* 
Extending [VkObjectType](VkObjectType.html):

[VK_OBJECT_TYPE_BUFFER_COLLECTION_FUCHSIA](VkObjectType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BUFFER_COLLECTION_BUFFER_CREATE_INFO_FUCHSIA](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_COLLECTION_CONSTRAINTS_INFO_FUCHSIA](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_COLLECTION_CREATE_INFO_FUCHSIA](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_COLLECTION_IMAGE_CREATE_INFO_FUCHSIA](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_COLLECTION_PROPERTIES_FUCHSIA](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_CONSTRAINTS_INFO_FUCHSIA](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_CONSTRAINTS_INFO_FUCHSIA](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_FORMAT_CONSTRAINTS_INFO_FUCHSIA](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMPORT_MEMORY_BUFFER_COLLECTION_FUCHSIA](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SYSMEM_COLOR_SPACE_FUCHSIA](VkStructureType.html)

If [VK_EXT_debug_report](VK_EXT_debug_report.html) is supported:

* 
Extending [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html):

[VK_DEBUG_REPORT_OBJECT_TYPE_BUFFER_COLLECTION_FUCHSIA_EXT](VkDebugReportObjectTypeEXT.html)

1) When configuring a [VkImageConstraintsInfoFUCHSIA](VkImageConstraintsInfoFUCHSIA.html) structure for
constraint setting, should a NULL `pFormatConstraints` parameter be
allowed ?

**RESOLVED**: No.
Specifying a NULL `pFormatConstraints` results in logical complexity of
interpreting the relationship between the
[VkImageCreateInfo](VkImageCreateInfo.html)::`usage` settings of the elements of the
`pImageCreateInfos` array and the implied or desired
[VkFormatFeatureFlags](VkFormatFeatureFlags.html).

The explicit requirement for `pFormatConstraints` to be non-NULL
simplifies the implied logic of the implementation and expectations for the
Vulkan application.

* 
Revision 2, 2021-09-23 (John Rosasco)

Review passes

Revision 1, 2021-03-09 (John Rosasco)

* 
Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_FUCHSIA_buffer_collection).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
