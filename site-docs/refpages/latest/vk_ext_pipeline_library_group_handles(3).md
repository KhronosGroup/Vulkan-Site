# VK_EXT_pipeline_library_group_handles(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_pipeline_library_group_handles.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_pipeline_library_group_handles](#VK_EXT_pipeline_library_group_handles)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_pipeline_library_group_handles - device extension

**Name String**

`VK_EXT_pipeline_library_group_handles`

**Extension Type**

Device extension

**Registered Extension Number**

499

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)

and

[VK_KHR_pipeline_library](VK_KHR_pipeline_library.html)

**Contact**

* 
Hans-Kristian Arntzen [HansKristian-Work](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_pipeline_library_group_handles] @HansKristian-Work%0A*Here describe the issue or question you have about the VK_EXT_pipeline_library_group_handles extension*)

**Extension Proposal**

[VK_EXT_pipeline_library_group_handles](../../../../features/latest/features/proposals/VK_EXT_pipeline_library_group_handles.html)

**Last Modified Date**

2023-01-25

**IP Status**

No known IP claims.

**Contributors**

* 
Hans-Kristian Arntzen, Valve

* 
Stuart Smith, AMD

* 
Ricardo Garcia, Igalia

* 
Lionel Landwerlin, Intel

* 
Eric Werness, NVIDIA

* 
Daniel Koch, NVIDIA

When using pipeline libraries in ray tracing pipelines, a library might get
linked into different pipelines in an incremental way.
An application can have a strategy where a ray tracing pipeline is comprised
of N pipeline libraries and is later augmented by creating a new pipeline
with N + 1 libraries.
Without this extension, all group handles must be re-queried as the group
handle is tied to the pipeline, not the library.
This is problematic for applications which aim to decouple construction of
record buffers and the linkage of ray tracing pipelines.

To aid in this, this extension enables support for querying group handles
directly from pipeline libraries.
Group handles obtained from a library **must** remain bitwise identical in any
`VkPipeline` that links to the library.

With this feature, the extension also improves compatibility with DXR 1.1
AddToStateObject(), which guarantees that group handles returned remain
bitwise identical between parent and child pipelines.
In addition, querying group handles from COLLECTION objects is also
supported with that API.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePipelineLibraryGroupHandlesFeaturesEXT](VkPhysicalDevicePipelineLibraryGroupHandlesFeaturesEXT.html)

* 
`VK_EXT_PIPELINE_LIBRARY_GROUP_HANDLES_EXTENSION_NAME`

* 
`VK_EXT_PIPELINE_LIBRARY_GROUP_HANDLES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_LIBRARY_GROUP_HANDLES_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2023-01-25 (Hans-Kristian Arntzen)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_pipeline_library_group_handles).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
