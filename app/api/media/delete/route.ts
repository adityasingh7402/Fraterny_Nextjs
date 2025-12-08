/**
 * API Route: /api/media/delete
 * Methods: POST
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { Database } from '@/integrations/supabase/types';



export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const key = searchParams.get('key');

    if (!id && !key) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image ID or Key is required',
        },
        { status: 400 }
      );
    }

    // First get the complete image record
    let query = supabaseAdmin.from('website_images').select('*');

    if (id) {
      query = query.eq('id', id);
    } else if (key) {
      query = query.eq('key', key);
    }

    const { data: image, error: fetchError } = await query.single();

    if (fetchError || !image) {
      console.error('Error fetching image for deletion:', fetchError);
      return NextResponse.json(
        {
          success: false,
          error: 'Image not found',
        },
        { status: 404 }
      );
    }

    // Delete from storage
    if (image.storage_path) {
      const filesToDelete = [image.storage_path];

      // Also delete optimized versions if they exist
      if (image.sizes && typeof image.sizes === 'object') {
        const sizes = image.sizes as Record<string, string>;
        Object.values(sizes).forEach((path) => {
          if (path) filesToDelete.push(path);
        });
      }

      const { error: storageError } = await supabaseAdmin.storage
        .from('website-images')
        .remove(filesToDelete);

      if (storageError) {
        console.error('Error deleting from storage:', storageError);
        // Continue anyway to delete database record
      }
    }

    // Delete from database
    const { error: deleteError } = await supabaseAdmin
      .from('website_images')
      .delete()
      .eq('id', image.id);

    if (deleteError) {
      console.error('Error deleting image record:', deleteError);
      return NextResponse.json(
        {
          success: false,
          error: `Error deleting image: ${deleteError.message}`,
        },
        { status: 500 }
      );
    }

    console.log(`✅ Successfully deleted image: ${image.key}`);
    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

