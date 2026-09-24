# VK_EXT_multisampled_render_to_single_sampled(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_multisampled_render_to_single_sampled.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_multisampled_render_to_single_sampled](#VK_EXT_multisampled_render_to_single_sampled)
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

VK_EXT_multisampled_render_to_single_sampled - device extension

**Name String**

`VK_EXT_multisampled_render_to_single_sampled`

**Extension Type**

Device extension

**Registered Extension Number**

377

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html)

     and

     [VK_KHR_depth_stencil_resolve](VK_KHR_depth_stencil_resolve.html)

or

[Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_multisampled_render_to_single_sampled] @syoussefi%0A*Here describe the issue or question you have about the VK_EXT_multisampled_render_to_single_sampled extension*)

**Extension Proposal**

[VK_EXT_multisampled_render_to_single_sampled](../../../../features/latest/features/proposals/VK_EXT_multisampled_render_to_single_sampled.html)

**Last Modified Date**

2021-04-16

**IP Status**

No known IP claims.

**Contributors**

* 
Shahbaz Youssefi, Google

* 
Jan-Harald Fredriksen, Arm

* 
Jörg Wagner, Arm

* 
Matthew Netsch, Qualcomm Technologies, Inc.

* 
Jarred Davies, Imagination Technologies

With careful usage of resolve attachments, multisampled image memory
allocated with [VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT](VkMemoryPropertyFlagBits.html), `loadOp`
not equal to [VK_ATTACHMENT_LOAD_OP_LOAD](VkAttachmentLoadOp.html) and `storeOp` not equal to
[VK_ATTACHMENT_STORE_OP_STORE](VkAttachmentStoreOp.html), a Vulkan application is able to
efficiently perform multisampled rendering without incurring any additional
memory penalty on some implementations.

Under certain circumstances however, the application may not be able to
complete its multisampled rendering within a single render pass; for example
if it does partial rasterization from frame to frame, blending on an image
from a previous frame, or in emulation of
GL_EXT_multisampled_render_to_texture.
In such cases, the application can use an initial subpass to effectively
load single-sampled data from the next subpass’s resolve attachment and fill
in the multisampled attachment which otherwise uses `loadOp` equal to
[VK_ATTACHMENT_LOAD_OP_DONT_CARE](VkAttachmentLoadOp.html).
However, this is not always possible (for example for stencil in the absence
of VK_EXT_shader_stencil_export) and has multiple drawbacks.

Some implementations are able to perform said operation efficiently in
hardware, effectively loading a multisampled attachment from the contents of
a single sampled one.
Together with the ability to perform a resolve operation at the end of a
subpass, these implementations are able to perform multisampled rendering on
single-sampled attachments with no extra memory or bandwidth overhead.
This extension exposes this capability by allowing a framebuffer and render
pass to include single-sampled attachments while rendering is done with a
specified number of samples.

* 
Extending [VkFormatProperties2](VkFormatProperties2.html):

[VkSubpassResolvePerformanceQueryEXT](VkSubpassResolvePerformanceQueryEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceMultisampledRenderToSingleSampledFeaturesEXT](VkPhysicalDeviceMultisampledRenderToSingleSampledFeaturesEXT.html)

Extending [VkSubpassDescription2](VkSubpassDescription2.html), [VkRenderingInfo](VkRenderingInfo.html):

* 
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html)

* 
`VK_EXT_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_EXTENSION_NAME`

* 
`VK_EXT_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_SPEC_VERSION`

* 
Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

[VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBPASS_RESOLVE_PERFORMANCE_QUERY_EXT](VkStructureType.html)

1) Could the multisampled attachment be initialized through some form of
copy?

**RESOLVED**: No.
Some implementations do not support copying between attachments in general,
and find expressing this operation through a copy unnatural.

2) Another way to achieve this is by introducing a new `loadOp` to load
the contents of the multisampled image from a single-sampled one.
Why is this extension preferred?

**RESOLVED**: Using this extension simplifies the application, as it does not
need to manage a secondary lazily-allocated image.
Additionally, using this extension leaves less room for error; for example a
single mistake in `loadOp` or `storeOp` would result in the
lazily-allocated image to actually take up memory, and remain so until
destruction.

3) There is no guarantee that multisampled data between two subpasses with
the same number of samples will be retained as the implementation may be
forced to split the render pass implicitly for various reasons.
Should this extension require that every subpass that uses
multisampled-render-to-single-sampled end in an implicit render pass split
(which results in a resolve operation)?

**RESOLVED**: No.
Not requiring this allows render passes with multiple
multisampled-render-to-single-sampled subpasses to potentially execute more
efficiently (though there is no guarantee).

* 
Revision 1, 2021-04-12 (Shahbaz Youssefi)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_multisampled_render_to_single_sampled).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
