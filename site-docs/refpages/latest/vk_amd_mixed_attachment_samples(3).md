# VK_AMD_mixed_attachment_samples(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_mixed_attachment_samples.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_mixed_attachment_samples](#VK_AMD_mixed_attachment_samples)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_mixed_attachment_samples - device extension

**Name String**

`VK_AMD_mixed_attachment_samples`

**Extension Type**

Device extension

**Registered Extension Number**

137

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_KHR_dynamic_rendering

**Contact**

* 
Matthaeus G. Chajdas [anteru](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_mixed_attachment_samples] @anteru%0A*Here describe the issue or question you have about the VK_AMD_mixed_attachment_samples extension*)

**Last Modified Date**

2017-07-24

**Contributors**

* 
Mais Alnasser, AMD

* 
Matthaeus G. Chajdas, AMD

* 
Maciej Jesionowski, AMD

* 
Daniel Rakos, AMD

This extension enables applications to use multisampled rendering with a
depth/stencil sample count that is larger than the color sample count.
Having a depth/stencil sample count larger than the color sample count
allows maintaining geometry and coverage information at a higher sample rate
than color information.
All samples are depth/stencil tested, but only the first color sample count
number of samples get a corresponding color output.

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) is supported:

* 
Extending [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html):

[VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html)

* 
`VK_AMD_MIXED_ATTACHMENT_SAMPLES_EXTENSION_NAME`

* 
`VK_AMD_MIXED_ATTACHMENT_SAMPLES_SPEC_VERSION`

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_ATTACHMENT_SAMPLE_COUNT_INFO_AMD](VkStructureType.html)

None.

* 
Revision 1, 2017-07-24 (Daniel Rakos)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_mixed_attachment_samples).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
