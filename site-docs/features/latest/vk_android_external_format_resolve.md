# VK_ANDROID_external_format_resolve

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_ANDROID_external_format_resolve.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Dynamic Rendering](#_dynamic_rendering)
- [3.1._Dynamic_Rendering](#_dynamic_rendering)
- [3.1.1. Inheritance Info](#_inheritance_info)
- [3.1.1._Inheritance_Info](#_inheritance_info)
- [3.2. Render Pass Objects](#_render_pass_objects)
- [3.2._Render_Pass_Objects](#_render_pass_objects)
- [3.3. Input Attachments](#_input_attachments)
- [3.3._Input_Attachments](#_input_attachments)
- [3.4. Format Resolve Properties](#_format_resolve_properties)
- [3.4._Format_Resolve_Properties](#_format_resolve_properties)
- [3.5. Device Features](#_device_features)
- [3.5._Device_Features](#_device_features)
- [3.6. Device Properties](#_device_properties)
- [3.6._Device_Properties](#_device_properties)
- [4. Examples](#_examples)
- [4.1. Creation of a Render Pass Object](#_creation_of_a_render_pass_object)
- [4.1._Creation_of_a_Render_Pass_Object](#_creation_of_a_render_pass_object)
- [4.2. Dynamic Rendering](#_dynamic_rendering_2)
- [4.2._Dynamic_Rendering](#_dynamic_rendering_2)
- [5. Issues](#_issues)
- [5.1. GL_EXT_yuv_target had a shader extension, but this does not, why?](#_gl_ext_yuv_target_had_a_shader_extension_but_this_does_not_why)
- [5.1._GL_EXT_yuv_target_had_a_shader_extension,_but_this_does_not,_why?](#_gl_ext_yuv_target_had_a_shader_extension_but_this_does_not_why)
- [5.2. Who is responsible for conversions to and from YCBCR color spaces?](#_who_is_responsible_for_conversions_to_and_from_ycbcr_color_spaces)
- [5.2._Who_is_responsible_for_conversions_to_and_from_YCBCR_color_spaces?](#_who_is_responsible_for_conversions_to_and_from_ycbcr_color_spaces)
- [5.3. How do attachment clears work?](#_how_do_attachment_clears_work)
- [5.3._How_do_attachment_clears_work?](#_how_do_attachment_clears_work)
- [5.4. What is the expected channel order for YUV output?](#_what_is_the_expected_channel_order_for_yuv_output)
- [5.4._What_is_the_expected_channel_order_for_YUV_output?](#_what_is_the_expected_channel_order_for_yuv_output)
- [5.5. How is resampling performed for null attachments when nullColorAttachmentWithExternalFormatResolve is supported?](#_how_is_resampling_performed_for_null_attachments_when_nullcolorattachmentwithexternalformatresolve_is_supported)
- [5.5._How_is_resampling_performed_for_null_attachments_when_nullColorAttachmentWithExternalFormatResolve_is_supported?](#_how_is_resampling_performed_for_null_attachments_when_nullcolorattachmentwithexternalformatresolve_is_supported)
- [5.6. Is there a way we could better unify the two options for the nullColorAttachmentWithExternalFormatResolve path?](#_is_there_a_way_we_could_better_unify_the_two_options_for_the_nullcolorattachmentwithexternalformatresolve_path)
- [5.6._Is_there_a_way_we_could_better_unify_the_two_options_for_the_nullColorAttachmentWithExternalFormatResolve_path?](#_is_there_a_way_we_could_better_unify_the_two_options_for_the_nullcolorattachmentwithexternalformatresolve_path)
- [5.7._How_can_contents_of_an_external_image_be_preserved_when_rendering_if_nullColorAttachmentWithExternalFormatResolve_is_VK_FALSE?](#_how_can_contents_of_an_external_image_be_preserved_when_rendering_if_nullcolorattachmentwithexternalformatresolve_is_vk_false)
- [6. Future Work](#_future_work)
- [6._Future_Work](#_future_work)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Dynamic Rendering](#_dynamic_rendering)
[3.2. Render Pass Objects](#_render_pass_objects)
[3.3. Input Attachments](#_input_attachments)
[3.4. Format Resolve Properties](#_format_resolve_properties)
[3.5. Device Features](#_device_features)
[3.6. Device Properties](#_device_properties)

[4. Examples](#_examples)

[4.1. Creation of a Render Pass Object](#_creation_of_a_render_pass_object)
[4.2. Dynamic Rendering](#_dynamic_rendering_2)

[5. Issues](#_issues)

[5.1. GL_EXT_yuv_target had a shader extension, but this does not, why?](#_gl_ext_yuv_target_had_a_shader_extension_but_this_does_not_why)
[5.2. Who is responsible for conversions to and from YCBCR color spaces?](#_who_is_responsible_for_conversions_to_and_from_ycbcr_color_spaces)
[5.3. How do attachment clears work?](#_how_do_attachment_clears_work)
[5.4. What is the expected channel order for YUV output?](#_what_is_the_expected_channel_order_for_yuv_output)
[5.5. How is resampling performed for null attachments when `nullColorAttachmentWithExternalFormatResolve` is supported?](#_how_is_resampling_performed_for_null_attachments_when_nullcolorattachmentwithexternalformatresolve_is_supported)
[5.6. Is there a way we could better unify the two options for the `nullColorAttachmentWithExternalFormatResolve` path?](#_is_there_a_way_we_could_better_unify_the_two_options_for_the_nullcolorattachmentwithexternalformatresolve_path)
[5.7. How can contents of an external image be preserved when rendering if `nullColorAttachmentWithExternalFormatResolve` is `VK_FALSE`?](#_how_can_contents_of_an_external_image_be_preserved_when_rendering_if_nullcolorattachmentwithexternalformatresolve_is_vk_false)

[6. Future Work](#_future_work)

This extension enables rendering to Android Hardware Buffers with external formats which cannot be directly represented as renderable in Vulkan, including YCBCR formats.

Applications can render to unknown formats on Android today in OpenGL ES using GL_EXT_yuv_target, which enables direct rendering to images with an unknown external YCBCR format.
In order to support these applications running on top of Vulkan (either via porting or through ANGLE), similar functionality is required for Vulkan.

One issue that needs to be overcome however, is that GL_EXT_yuv_target is very opaque, and in OpenGL ES this allows implementations to hide a lot of gnarly details.
For Vulkan, it is much harder to hide those details, so an alternative which meets the needs of all potential implementations is required, including those that have no direct support for rendering to YCBCR images.

Any solution needs to meet the following requirements:

* 
It must provide functionality on par with that provided by GL_EXT_yuv_target

* 
It must be possible to emulate GL_EXT_yuv_target in ANGLE via this extension

* 
It must be cleanly implementable on all implementations

* 
It must perform well on implementations that support direct YCBCR rendering

* 
It must be relatively straightforward for applications to use

* 
It must support render pass objects and dynamic rendering

The naive solution would be to directly allow rendering to YCBCR images in Vulkan; this would meet most requirements but likely fail at being cleanly implementable, or a lot of awkward detail would need to be exposed to developers.

Another idea that has been suggested would be to enable something via a similar mechanism used for resolving multisampled images at the end of a render pass; resolve operations.
Care is needed to ensure implementations can still use direct rendering, but it should be able to meet all of the above requirements.

This extension extends both render pass objects and dynamic rendering functionality.

When using dynamic rendering, a new resolve mode is added to specify that the resolve attachment will have an external format:

    VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID;

When this resolve mode is specified, the `resolveImageView` member of [VkRenderingAttachmentInfo](https://docs.vulkan.org/spec/latest/chapters/renderpass.html#VkRenderingAttachmentInfo) used as a color attachment must be set to a `VkImageView` created with an image with a non-zero external format.
If chroma planes of the external format are subsampled, the implementation will reduce the relevant planes by either averaging the corresponding values in the color attachment, or by simply selecting one of the values as representative.
Implementations may resolve a color attachment to an external format resolve attachment at any time, or bypass writing to a color attachment altogether.

With the resolve mode set to `VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID`, the following additional constraints also apply:

* 
If `nullColorAttachmentWithExternalFormatResolve` property is `VK_TRUE`, `imageView` must be `VK_NULL_HANDLE`.

Values in the color attachment during rendering are loaded from the external format attachment, resampling to the fragment rate as necessary.

If `imageView` is not `NULL`, it must be a single sampled image with a layer count of `1`.

The `layerCount` and `colorAttachmentCount` members of [VkRenderingInfo](https://docs.vulkan.org/spec/latest/chapters/renderpass.html#VkRenderingInfo) must be 1.

The `viewMask` member of [VkRenderingInfo](https://docs.vulkan.org/spec/latest/chapters/renderpass.html#VkRenderingInfo) must be 0.

There must not be a fragment density map image

There must not be a fragment shading rate image

The fragment shading rate must be 1x1

Implementations may need to know that an external format YCBCR format is being used when creating a pipeline, so when dynamic rendering is used, [VkExternalFormatANDROID](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkExternalFormatANDROID) can be chained to `VkGraphicsPipelineCreateInfo`, indicating the format of the resolve image.
When rendering, the format of the resolve image specified here and the actual image view used for that color resolve attachment must be the same.
Graphics pipelines that include a [VkExternalFormatANDROID](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkExternalFormatANDROID) structure with a non-zero value must only write to a single color attachment, must not export depth or stencil from the fragment shader, and must disable blending.

When dynamic rendering is used with secondary command buffer inheritance, the external format **must** be made known to the secondary command buffers by including [VkExternalFormatANDROID](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkExternalFormatANDROID) in the `pNext` chain of [VkCommandBufferInheritanceInfo](https://docs.vulkan.org/spec/latest/chapters/cmdbuffers.html#VkCommandBufferInheritanceInfo), and the external format must match that in the render pass instance.

For render pass objects, color resolve attachments can similarly be repurposed for external YCBCR format resolves by setting a color resolve attachment in a subpass to an attachment with an external format.
These can only be used with [VkSubpassDescription2](https://docs.vulkan.org/spec/latest/chapters/renderpass.html#VkSubpassDescription2), and similar restrictions apply to this as they do to dynamic rendering:

* 
The resolve attachment must be an attachment that has a format of `VK_FORMAT_UNDEFINED` and includes a [VkExternalFormatANDROID](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkExternalFormatANDROID) structure in its `pNext` chain

This format must match that for the image view bound via the framebuffer

If `nullColorAttachmentWithExternalFormatResolve` property is `VK_TRUE`, the `attachment` member of the corresponding color attachment must be `VK_ATTACHMENT_UNUSED`.

If the color attachment is not `VK_ATTACHMENT_UNUSED`, it must be a single sampled attachment.

`viewMask` must be 0.

`colorAttachmentCount` must be 1.

Color attachment values written during rendering are resolved in the same manner as specified for `VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID`.

If the `nullColorAttachmentWithExternalFormatResolve` property is `VK_FALSE`, applications can bind the color attachment as they normally would with any other color attachment, with value reads working as expected.
Using an external format image as an input attachment is only valid when the feature bits queried via [vkGetAndroidHardwareBufferPropertiesANDROID](https://docs.vulkan.org/spec/latest/chapters/memory.html#vkGetAndroidHardwareBufferPropertiesANDROID) advertise this functionality.

However, if the `nullColorAttachmentWithExternalFormatResolve` property is `VK_TRUE`, applications cannot do that as there is no attachment to use.
Instead, the resolve attachment itself should be bound as the input attachment (both the attachment reference and the descriptor).
When using a resolve attachment in this specific configuration, it can be synchronized as if it were actually the color attachment, allowing for subpass self-dependencies.
If the implementation supports this property, an external format image can be used as an input attachment without the typically required feature bits advertised by [vkGetAndroidHardwareBufferPropertiesANDROID](https://docs.vulkan.org/spec/latest/chapters/memory.html#vkGetAndroidHardwareBufferPropertiesANDROID).

If an external format resolve image is read as an input attachment and has subsampled chroma planes, these are resampled per above to provide values at the expected rate.
Their values are not converted via color space transforms - as with resolves the application must transform these themselves.

Not all external formats will be usable for an external format resolve; the following property structure indicates whether an external format is supported for resolves or not:

typedef struct VkAndroidHardwareBufferFormatResolvePropertiesANDROID {
    VkStructureType     sType;
    void*               pNext;
    VkFormat            colorAttachmentFormat;
} VkAndroidHardwareBufferFormatResolvePropertiesANDROID;

External formats that can be resolved to will indicate a format that color attachments should use when rendering.
If it is not resolvable, it will be set to `VK_FORMAT_UNDEFINED`.

Any Android hardware buffer that is renderable must be either renderable via existing format paths or via this extension.

|  | For implementations that expose `nullColorAttachmentWithExternalFormatResolve`, the format should not be used to create images, but does still serve two additional purposes.
| --- | --- |

Firstly, the numeric type of the format indicates the type that is needed in the shader (e.g. an `UNORM` format indicates a floating-point color output).

In addition to that, it indicates the precision of data while the color output remains in the color buffer; as such it should always have a per-channel precision equal to or greater than that of the hardware buffer format.
Implementations that directly render to the resolve attachment and never store data in an intermediate color buffer can set this to a type large enough that it guarantees it will not interfere with the precision of the final value.
As there is no expectation of data remaining in the color buffer, applications should expect a minimum precision according to the lowest precision of each channel between the color buffer format and the format of the Android hardware buffer. |

The following single feature is exposes all the functionality in this extension:

typedef struct VkPhysicalDeviceExternalFormatResolveFeaturesANDROID {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           externalFormatResolve;
} VkPhysicalDeviceExternalFormatResolveFeaturesANDROID;

`externalFormatResolve` must be supported if this extension is advertised.

The following properties are exposed:

typedef struct VkPhysicalDeviceExternalFormatResolvePropertiesANDROID {
    VkStructureType     sType;
    void*               pNext;
    VkBool32            nullColorAttachmentWithExternalFormatResolve;
    VkChromaLocation    externalFormatResolveChromaOffsetX;
    VkChromaLocation    externalFormatResolveChromaOffsetY;
} VkPhysicalDeviceExternalFormatResolvePropertiesANDROID;

* 
If `nullColorAttachmentWithExternalFormatResolve` is `VK_TRUE`, applications must omit the color attachment by setting `VkRenderingAttachmentInfo::imageView` to `NULL` for dynamic rendering, or using `VK_ATTACHMENT_UNUSED` for the color attachment when creating a render pass object.

* 
`externalFormatResolveChromaOffsetX` indicates the chroma offset in the X axis that an implementation uses when resolving to or loading from resolve attachments with an external format.

* 
`externalFormatResolveChromaOffsetY` indicates the chroma offset in the Y axis that an implementation uses when resolving to or loading from resolve attachments with an external format.

|  | The chroma offsets are consistent between reads and writes inside the Vulkan implementation, but may be inconsistent with other systems writing that data; this may lead to slight inaccuracies when reading from input attachments without writing to them first. If this accuracy is a concern, YCBCR sampling can be used for the initial read, where the offset is configurable, rather than reading as an input attachment. |
| --- | --- |

// Create two attachments, a resolve and color attachment
VkAttachmentDescription2 attachments[2] = {
    {
        VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_2,
        &externalFormat,
        0,
        VK_FORMAT_UNDEFINED,
        1,
        VK_LOAD_OP_LOAD,
        VK_STORE_OP_STORE,
        VK_LOAD_OP_LOAD,
        VK_STORE_OP_STORE,
        VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL,
        VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL
    },
    {
        VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_2,
        NULL,
        0,
        resolveFormatProperties.colorAttachmentFormat,
        1,
        VK_LOAD_OP_LOAD,
        VK_STORE_OP_STORE,
        VK_LOAD_OP_LOAD,
        VK_STORE_OP_STORE,
        VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL,
        VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL
     }
};

// Resolve attachment always specified
VkAttachmentReference2 resolveAttachment = {
    VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_2,
    NULL,
    0,
    VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL,
    0};

// Color attachment must be UNUSED if nullColorAttachmentWithExternalFormatResolve is VK_TRUE
VkAttachmentReference2 colorAttachment = {
    VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_2,
    NULL,
    nullColorAttachmentWithExternalFormatResolve ? VK_ATTACHMENT_UNUSED : 1,
    VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL,
    0};

// No changes to subpass creation
VkSubpassDescription2 subpass = {
    VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_2,
    NULL,
    0,
    VK_PIPELINE_BIND_POINT_GRAPHICS,
    0,
    0,
    NULL,
    1,
    &colorAttachment,
    &resolveAttachment,
    NULL,
    0,
    NULL};

// Only add the color attachment information if nullColorAttachmentWithExternalFormatResolve is VK_FALSE
VkRenderPassCreateInfo2 createInfo = {
    VK_STRUCTURE_TYPE_RENDER_PASS_CREATE_INFO_2,
    NULL,
    0,
    nullColorAttachmentWithExternalFormatResolve ? 1 : 2,
    &attachments,
    1,
    &subpass,
    0,
    0,
    NULL};

VkRenderPass renderPass;
vkCreateRenderPass2(device, &createInfo, NULL, &renderPass);

// Do not attach a color image view if nullColorAttachmentWithExternalFormatResolve is VK_TRUE
// Other setup is identical either way
VkRenderingAttachmentInfo colorAttachment = {
    VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO,
    NULL,
    nullColorAttachmentWithExternalFormatResolve ? VK_NULL_HANDLE : colorImageView;
    VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL,
    VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID,
    externalResolveImageView,
    VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL,
    VK_LOAD_OP_LOAD,
    VK_STORE_OP_STORE,
    clearValue};

VkRect2D renderArea = { ... };
VkRenderingInfo renderingInfo = {
    VK_STRUCTURE_TYPE_RENDERING_INFO,
    NULL,
    0,
    renderArea,
    1,
    0,
    1,
    &colorAttachment,
    NULL,
    NULL};

vkCmdBeginRendering(commandBuffer, renderingInfo);

The GLSL portion of that extension consisted of two parts:

A designation that a color output would be used as yuv

YUV conversion helper functions

For the helper functions, no implementation can accelerate these operations in shader code; so they have been omitted in favor of high level language translation (e.g. glslang) providing these functions.

The yuv output marker was necessary in GLSL because it substantially affected compilation, and this is the only way OpenGL ES had to make such information known to the compiler.
In Vulkan however there is a pipeline object we can use instead; the pipeline contains enough information to make this information available at the API level.
This does mean this extension will not work with VK_EXT_shader_object or any similar extension without further work.
All of this is a deliberate choice due to time constraints.

The application is responsible for these conversions; the implementation is only responsible for resampling the values between different sampling rates on the chroma planes.
Output value expectations match those of GL_EXT_yuv_target.

Attachment clears operate as if they were writes to the color attachment, which means that as with color attachment writes, values must be in the correct color space for the external format and in the expected channel order.

In GL_EXT_yuv_target, the expected mapping was for the Y, CB, and CR channels to map to the R, G, and B channels of the output, respectively.
However, Vulkan established a convention that CB and CR should map to B and R channels, matching their chroma designation.

This extension matches the Vulkan convention, requiring the Y, CB, and CR channels to map to the G, B, and R channels in the output, respectively.

|  | The channel order and color space of an imported external format are opaque to the Vulkan implementation.
| --- | --- |
Therefore, all external resolve and input attachment accesses are treated as if they were color images in the ycbcr identity model, without range expansion.
For example, images with four components are treated as R = Cr, G = Y, and B = Cb. This means that effectively:

* 
Input attachment reads present color components as vec4(R, G, B, A) to the shader and yuv components as (V, Y, U, A)

* 
External format resolve takes color components from the shader out variable as vec4(R, G, B, A) and yuv components as (V, Y, U, A)

* 
Clear color given to begin rendering/render pass are taken as (R, G, B, A) for color components and (V, Y, U, A) for yuv components

Implementations must not expose an external formats representing a depth or stencil format.
Applications must import depth images with [VkFormat](https://docs.vulkan.org/spec/latest/chapters/formats.html#VkFormat) in order to render to them.
Images without depth, color, or yuv components are beyond the scope of Vulkan interface and are defined by the format for which effective color components it should be used as, such as for the RAW10 format. |

The nearest sample is read from subsampled planes to populate the values in the fragment shader.

This could likely be done, but has been skipped due to time constraints.
A future extension should be able to do a better job of unifying these paths.

When a render pass starts, it loads data from the color attachment if `nullColorAttachmentWithExternalFormatResolve` is `VK_FALSE`, rather than unresolving from the external image.
This can lead to data not being preserved when beginning a new render.

If the contents of the external image are only being rendered by the application using external format resolves, then the color attachment data will contain any unresolved data from those previous renders if `VK_STORE_OP_STORE` is used, preserving rendering data.
However, if the contents of the external image are not reflected in the color attachment, applications need to manually unresolve the image in a separate pass, before rendering begins.

If the contents do not need to be preserved when rendering begins, rendering can be performed as usual with no specific requirements.

This extension is fairly limited, as it is meant to match GL_EXT_yuv_target and do no more due to time constraints.
Further extensions could be introduced to expand the functionality to include things like multisampling, storing both color and YCBCR images, tighter controls on precision, and color space conversions.
