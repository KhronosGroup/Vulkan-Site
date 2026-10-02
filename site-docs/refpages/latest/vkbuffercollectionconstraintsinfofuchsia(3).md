# VkBufferCollectionConstraintsInfoFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferCollectionConstraintsInfoFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferCollectionConstraintsInfoFUCHSIA - Structure of general buffer collection constraints

The `VkBufferCollectionConstraintsInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkBufferCollectionConstraintsInfoFUCHSIA {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           minBufferCount;
    uint32_t           maxBufferCount;
    uint32_t           minBufferCountForCamping;
    uint32_t           minBufferCountForDedicatedSlack;
    uint32_t           minBufferCountForSharedSlack;
} VkBufferCollectionConstraintsInfoFUCHSIA;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`minBufferCount` is the minimum number of buffers available in the
collection

* 
`maxBufferCount` is the maximum number of buffers allowed in the
collection

* 
`minBufferCountForCamping` is the per-participant minimum buffers
for camping

* 
`minBufferCountForDedicatedSlack` is the per-participant minimum
buffers for dedicated slack

* 
`minBufferCountForSharedSlack` is the per-participant minimum
buffers for shared slack

Sysmem uses all buffer count parameters in combination to determine the
number of buffers it will allocate.
Sysmem defines buffer count constraints in
`fuchsia.sysmem/constraints.fidl`.

*Camping* as referred to by `minBufferCountForCamping`, is the number of
buffers that should be available for the participant that are not for
transient use.
This number of buffers is required for the participant to logically operate.

*Slack* as referred to by `minBufferCountForDedicatedSlack` and
`minBufferCountForSharedSlack`, refers to the number of buffers desired
by participants for optimal performance.
`minBufferCountForDedicatedSlack` refers to the current participant.
`minBufferCountForSharedSlack` refers to buffer slack for all
participants in the collection.

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCollectionConstraintsInfoFUCHSIA-sType-sType) VUID-VkBufferCollectionConstraintsInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_COLLECTION_CONSTRAINTS_INFO_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkBufferCollectionConstraintsInfoFUCHSIA-pNext-pNext) VUID-VkBufferCollectionConstraintsInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkBufferConstraintsInfoFUCHSIA](VkBufferConstraintsInfoFUCHSIA.html), [VkImageConstraintsInfoFUCHSIA](VkImageConstraintsInfoFUCHSIA.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferCollectionConstraintsInfoFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
